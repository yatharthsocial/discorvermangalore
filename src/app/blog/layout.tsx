export default function BlogLayout({ children }: LayoutProps<"/blog">) {
  return <div className="mx-auto w-full max-w-3xl px-4 py-10">{children}</div>;
}
