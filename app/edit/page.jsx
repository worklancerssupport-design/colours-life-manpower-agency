import EditConsole from './EditConsole';

// Dynamic so the console shell is never statically cached, and so the chrome
// opt-out in SiteChrome sees the real pathname during server rendering.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Edit console',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function EditPage() {
  return <EditConsole />;
}
