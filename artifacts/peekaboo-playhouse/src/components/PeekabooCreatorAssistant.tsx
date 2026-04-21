import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Bot, User, Loader2, Sparkles, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  attachments?: { name: string; url: string; type: string }[];
};

const API_BASE = `${import.meta.env.BASE_URL}api`.replace(/\/+api$/, '/api');

export function PeekabooCreatorAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I am the Peekaboo Creator Assistant. I can help you write stories, brainstorm fun ideas for kids, and create magical adventures! What shall we make today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (!input.trim() && attachments.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      attachments: attachments.map(f => ({
        name: f.name,
        url: URL.createObjectURL(f),
        type: f.type
      }))
    };

    const history = [...messages, userMessage];
    setMessages(history);
    setInput('');
    setAttachments([]);
    setIsLoading(true);

    const assistantId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

    try {
      const res = await fetch(`${API_BASE}/chat/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.map(m => ({ role: m.role, content: m.content })),
          attachmentCount: attachments.length,
        }),
      });

      if (!res.ok || !res.body) throw new Error('Chat request failed');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        for (const line of lines) {
          if (!line.startsWith('data:')) continue;
          const payload = line.slice(5).trim();
          if (!payload) continue;
          try {
            const evt = JSON.parse(payload);
            if (evt.content) {
              setMessages(prev => prev.map(msg =>
                msg.id === assistantId ? { ...msg, content: msg.content + evt.content } : msg
              ));
            }
          } catch {
            // ignore parse errors
          }
        }
      }
    } catch (error) {
      console.error('Assistant Error:', error);
      setMessages(prev => prev.map(msg =>
        msg.id === assistantId
          ? { ...msg, content: "Oops! Our magic ran into a little hiccup. Could you try that again?" }
          : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="flex items-center p-4 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="bg-white p-2 rounded-full shadow-sm mr-3">
          <Bot size={24} className="text-[#8338EC]" />
        </div>
        <div>
          <h3 className="font-display font-bold text-slate-800 text-lg">Creator Assistant</h3>
          <p className="text-xs text-slate-500 font-medium flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-1 inline-block"></span> Online & Ready for Magic</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-slate-50/50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
              <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-md ${
                message.role === 'user' ? 'bg-[#FFB703]' : 'bg-[#EF476F]'
              }`}>
                {message.role === 'user' ? <User size={18} className="text-white" /> : <Sparkles size={18} className="text-white" />}
              </div>
              <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'} `}>
                <div
                  className={`px-5 py-4 rounded-2xl md:rounded-3xl shadow-sm ${
                    message.role === 'user'
                      ? 'bg-[#118AB2] text-white rounded-tr-sm'
                      : 'bg-white border border-slate-100 text-slate-800 rounded-tl-sm'
                  }`}
                >
                  <div className="prose prose-sm md:prose max-w-none prose-p:leading-relaxed prose-headings:font-display">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>

                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.attachments.map((file, i) => (
                        <div key={i} className="flex items-center gap-2 bg-black/10 px-3 py-2 rounded-lg text-xs font-semibold backdrop-blur-sm">
                          <Paperclip size={14} />
                          {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex max-w-[80%] flex-row gap-3">
              <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#EF476F] flex items-center justify-center shadow-md">
                <Sparkles size={18} className="text-white animate-pulse" />
              </div>
              <div className="bg-white border border-slate-100 text-slate-800 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-[#8338EC]" />
                <span className="text-sm font-medium animate-pulse text-slate-500">Thinking up something brilliant...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
             {attachments.map((file, index) => (
                <div key={index} className="flex items-center gap-1 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full text-xs font-bold border border-slate-200 shadow-sm">
                  <span className="truncate max-w-[100px]">{file.name}</span>
                  <button type="button" onClick={() => removeAttachment(index)} className="hover:bg-slate-200 p-0.5 rounded-full transition-colors">
                    <X size={14} className="text-slate-500" />
                  </button>
                </div>
             ))}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex items-end gap-2 relative">
          <input
            type="file"
            multiple
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-3 text-slate-400 hover:text-[#EF476F] bg-slate-50 hover:bg-rose-50 rounded-xl transition-all h-12 flex items-center shrink-0"
            title="Attach magic files"
          >
            <Paperclip size={20} />
          </button>

          <div className="relative flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What are we crafting today?"
              className="w-full resize-none outline-none py-3 px-4 h-12 max-h-32 min-h-12 bg-slate-50 rounded-xl border border-slate-200 focus:border-[#118AB2] focus:ring-2 focus:ring-[#118AB2]/20 font-medium text-slate-700 transition-all text-sm leading-relaxed"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
          </div>

          <button
            type="submit"
            disabled={(!input.trim() && attachments.length === 0) || isLoading}
            className="shrink-0 h-12 w-12 bg-gradient-to-tr from-[#118AB2] to-[#06D6A0] hover:from-[#0f7a9e] hover:to-[#05b889] text-white rounded-xl flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
          >
            <Send size={20} className="ml-1" />
          </button>
        </form>
        <div className="text-center mt-2">
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">Peekaboo Assistant is powered by Gemini AI</p>
        </div>
      </div>
    </div>
  );
}
