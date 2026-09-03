import React, { useState } from 'react';
import { Copy, Check, X, Github, ExternalLink, Terminal, ShieldCheck, FileCode2 } from 'lucide-react';

interface GitHubPagesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubPagesModal: React.FC<GitHubPagesModalProps> = ({ isOpen, onClose }) => {
  const [copiedWorkflow, setCopiedWorkflow] = useState(false);
  const [copiedGhPagesCmd, setCopiedGhPagesCmd] = useState(false);

  if (!isOpen) return null;

  const githubActionWorkflow = `name: Deploy Portfolio to GitHub Pages

on:
  push:
    branches: [ "main" ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build Production Bundle
        run: npm run build

      - name: Upload Pages Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`;

  const copyToClipboard = async (text: string, type: 'workflow' | 'cmd') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'workflow') {
        setCopiedWorkflow(true);
        setTimeout(() => setCopiedWorkflow(false), 2000);
      } else {
        setCopiedGhPagesCmd(true);
        setTimeout(() => setCopiedGhPagesCmd(false), 2000);
      }
    } catch {
      // safe fallback
    }
  };

  return (
    <div 
      id="gh-pages-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#131915]/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        id="gh-pages-modal-card"
        className="bg-white rounded-lg shadow-xl border border-[#E3DCCE] w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E3DCCE] bg-[#FAF7F0] sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <Github className="w-5 h-5 text-[#173C2C]" />
            <div>
              <h3 className="font-serif font-bold text-[#131915] text-base">
                GitHub Pages Deployment Guide
              </h3>
              <p className="text-xs font-mono text-[#4E5A52]">
                Static hosting for Abel Mulat's NLP Researcher Portfolio
              </p>
            </div>
          </div>
          <button
            id="btn-close-gh-modal"
            onClick={onClose}
            aria-label="Close modal"
            className="text-[#4E5A52] hover:text-[#131915] p-1.5 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs text-[#131915]">
          {/* Overview Callout */}
          <div className="p-3.5 rounded bg-[#FAF7F0] border-l-2 border-[#173C2C]">
            <span className="font-mono font-semibold uppercase tracking-wider text-[#173C2C] text-[11px] block mb-1">
              Static &amp; Zero-Backend Architecture
            </span>
            <p className="text-[#4E5A52] leading-relaxed">
              This portfolio is engineered as a zero-runtime-dependency static site. It runs entirely in the browser, requires no server costs, and is protected with Content Security Policy headers. It deploys natively to GitHub Pages for free.
            </p>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#B34728]">
              Automated Deployment via GitHub Actions
            </h4>

            <ol className="space-y-2 list-decimal list-inside text-[#4E5A52] leading-relaxed">
              <li>
                Create a repository on GitHub (e.g. <span className="font-mono text-[#131915] bg-[#FAF7F0] px-1 py-0.5 rounded border border-[#E3DCCE]">abelmulat.github.io</span> or <span className="font-mono text-[#131915] bg-[#FAF7F0] px-1 py-0.5 rounded border border-[#E3DCCE]">nlp-portfolio</span>).
              </li>
              <li>
                In your repository, go to <span className="font-semibold text-[#131915]">Settings &rarr; Pages &rarr; Build and deployment &rarr; Source</span> and select <span className="font-semibold text-[#131915]">GitHub Actions</span>.
              </li>
              <li>
                Add the workflow file below at <span className="font-mono text-[#131915] bg-[#FAF7F0] px-1.5 py-0.5 rounded border border-[#E3DCCE]">.github/workflows/deploy.yml</span>.
              </li>
            </ol>
          </div>

          {/* Workflow Snippet Box */}
          <div className="rounded border border-[#E3DCCE] bg-[#131915] p-3 text-[#FAF7F0]">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#4E5A52]/50">
              <span className="font-mono text-[11px] text-[#C5D9CE] flex items-center gap-1.5">
                <FileCode2 className="w-3.5 h-3.5" />
                <span>.github/workflows/deploy.yml</span>
              </span>
              <button
                id="btn-copy-workflow"
                onClick={() => copyToClipboard(githubActionWorkflow, 'workflow')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono bg-[#173C2C] hover:bg-[#102D21] text-white transition-colors cursor-pointer"
              >
                {copiedWorkflow ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#77E2A8]" />
                    <span>Copied YAML</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Workflow</span>
                  </>
                )}
              </button>
            </div>
            <pre className="font-mono text-[11px] overflow-x-auto whitespace-pre leading-relaxed text-[#DCD4C5] max-h-52">
              {githubActionWorkflow}
            </pre>
          </div>

          {/* Terminal Command Alternative */}
          <div className="border-t border-[#E3DCCE] pt-3">
            <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#4E5A52] mb-1.5 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#173C2C]" />
              <span>Alternative: Direct CLI Push</span>
            </h4>
            <div className="rounded bg-[#FAF7F0] border border-[#E3DCCE] p-2.5 flex items-center justify-between font-mono text-xs text-[#131915]">
              <code>npm run build &amp;&amp; npx gh-pages -d dist</code>
              <button
                id="btn-copy-gh-cmd"
                onClick={() => copyToClipboard('npm run build && npx gh-pages -d dist', 'cmd')}
                className="text-[#4E5A52] hover:text-[#131915] p-1 rounded transition-colors"
                title="Copy command"
              >
                {copiedGhPagesCmd ? <Check className="w-3.5 h-3.5 text-[#173C2C]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#FAF7F0] border-t border-[#E3DCCE] flex items-center justify-between">
          <a
            href="https://docs.github.com/en/pages"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#173C2C] hover:underline"
          >
            <span>GitHub Pages Documentation</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            id="btn-close-gh-guide-footer"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#173C2C] hover:bg-[#102D21] text-[#FAF7F0] text-xs font-mono font-medium rounded transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
