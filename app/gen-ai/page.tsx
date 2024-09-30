"use client";

import './genai.css';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import { runAi } from '@/actions/ai';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';import {
  Card,
  CardContent,
  CardHeader
} from "@/components/ui/card"


export default function GenAIPage() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const handleClick = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await runAi(query);
      setResponse(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='m-5'>

      <form onSubmit={handleClick}>
        <Input className='mb-5'
          placeholder='Ask anything'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="secondary" type='submit'>Generate with Ai</Button>
      </form>

      <Card className="mt-5">
        <CardHeader>AI response will appear here...</CardHeader>
        <CardContent>
          {loading ? (<div>Loading...</div>) : (<ReactMarkdown children={response} remarkPlugins={[remarkGfm]} className="markdown" />)}
        </CardContent>
      </Card>

    </div>
  )
}

// https://stackoverflow.com/questions/63828162/table-tag-is-not-highlighting-or-rendering-in-react-markdown