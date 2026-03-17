import { redirect } from 'next/navigation';

export async function generateStaticParams() {
  return ["en","zh-cn","es","ja","ko","zh-tw","pt","fr","de"].map(locale => ({ locale }));
}

export default function Root() {
  redirect('/en');
}
