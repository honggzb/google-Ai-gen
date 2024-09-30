"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import template from "@/utils/template";
import { runAi, saveQuery } from "@/actions/ai";
import toast, {Toaster} from 'react-hot-toast';
import { ArrowLeft, Copy, Loader2Icon } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useUsage } from "@/context/usage";

export interface Template {
  name: string;
  desc: string;
  icon: string;
  category: string;
  slug: string;
  aiPrompt:string;
  form: Form[];
}

export interface Form {
  label: string;
  field: string;
  name: string;
  required: true,

}

const TemplatePage = ({ params }: { params: {slug: string} }) => {

  const [query, setQuery] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const editorRef = useRef<any>(null);

  const { fetchUsage, subscribed, count } = useUsage();  //context
  const { user } = useUser();
  //console.log('useUser in slug', user);
  const email = user?.primaryEmailAddress?.emailAddress || "";

  useEffect(() => {
    if(content) {
      const editorInstance = editorRef.current.getInstance();
      editorInstance.setMarkdown(content);
    }
  }, [content]);

  const t = template.find((item) => item.slug === params.slug) as Template;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await runAi(t.aiPrompt + query);
      setContent(data);
      await saveQuery(t, email, query, data);
      fetchUsage();
    } catch (error) {
      setContent("An error ocurred. Please try again!")
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    const editorInstance = editorRef.current.getInstance();
    const c = editorInstance.getMarkdown();   //getHTML()
    try {
      await navigator.clipboard.writeText(c)
      toast.success("Content copied to clipboard")
    } catch (error) {
      toast.error("An error ocurred. Please try again!")
    }
  }

  return (
    <div>
      <div className="flex justify-between mx-5 my-2">
        <Link href="/dashboard">
          <Button><ArrowLeft /><span className="ml-2">Back</span></Button>
        </Link>
        <Button onClick={handleCopy}>
          <Copy /><span className="ml-2">Copy</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5">
        <div className="col-span-1 bg-slate-100 dark:bg-slate-900 rounded-md border p-3">
          <div className="flex flex-col gap-3">
            <Image src={t.icon} alt={t.name} width={50} height={50} />
            <h2 className="font-medium text-lg">{t.name}</h2>
            <p className="text-gray-500">{t.desc}</p>
          </div>

          <form className="mt-6" onSubmit={handleSubmit}>
            {t.form.map((item) => (
              <div key={item.name} className="my-2 flex flex-col gap-2 mb-7">
                <label className="font-bold pb-5">{item.label}</label>
                {item.field === 'input' ? (
                  <Input name={item.name} onChange={(e) => setQuery(e.target.value)} required={item.required} />
                ) : (
                  <Textarea name={item.name} onChange={(e) => setQuery(e.target.value)} />
                )}
              </div>
            ))}

            <Button
              type="submit"
              className="w-full py-6"
              disabled={loading || (!subscribed && count >= Number(process.env.NEXT_PUBLIC_FREE_TIER_USAGE))}>
                { loading && <Loader2Icon className="animate-spin mr-2" /> }
                { subscribed || count < Number(process.env.NEXT_PUBLIC_FREE_TIER_USAGE) ?
                  ("Generate content") : ("Subscribe to generate content") }
            </Button>

          </form>
        </div>

        <div className="col-span-2">
          <Editor
            ref={editorRef}
            initialValue="Generated content will appear here."
            initialEditType='wysiwyg'
            previewStyle="vertical"
            height="600px"
            useCommandShortcut={true}
          />
        </div>
      </div>
    </div>
  )
}

export default TemplatePage