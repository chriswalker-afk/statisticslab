import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';

const sites=[
  {label:'New GitHub Pages custom domain',url:'https://statistics.mrwalkermaths.com/'},
  {label:'Original Netlify website',url:'https://statisticslab.netlify.app/'}
];
const sha=text=>createHash('sha256').update(text).digest('hex');
const source=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const report=[];
for(const site of sites){
  try{
    const response=await fetch(site.url,{
      redirect:'follow',
      headers:{'User-Agent':'StatisticsLab-Migration-Audit/1.0'},
      signal:AbortSignal.timeout(25000)
    });
    const html=await response.text();
    const item={
      site:site.label,url:site.url,status:response.status,finalUrl:response.url,
      contentType:response.headers.get('content-type'),
      length:Buffer.byteLength(html,'utf8'),sha256:sha(html),
      pageTitle:html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim()??null,
      scriptTags:[...html.matchAll(/<script\b/gi)].length,
      hasStatisticsLab:html.includes('StatsLab')||html.includes('Statistics Lab'),
      hasAct7:html.includes('Act 7'),
      matchesRepositorySource:html.replace(/\s+$/,'')===source.replace(/\s+$/,'')
    };
    report.push(item);
    console.log(JSON.stringify(item));
  }catch(error){
    const item={site:site.label,url:site.url,error:String(error)};
    report.push(item);
    console.error(JSON.stringify(item));
  }
}
const gh=report[0],netlify=report[1];
if(gh.status!==200||!gh.hasStatisticsLab)throw new Error('New custom domain is not serving Statistics Lab over HTTPS');
if(gh.matchesRepositorySource!==true)throw new Error('New published HTML differs from repository source; check deployment and Pages configuration');
if(netlify.status!==200){
  console.warn('Netlify site not accessible to check equivalence');
}else{
  const equals=gh.sha256===netlify.sha256;
  console.log('DEPLOYED_HTML_EQUAL='+equals);
  console.log('NETLIFY_IS_REPOSITORY_SOURCE='+netlify.matchesRepositorySource);
  console.log('HTML_BYTE_DIFFERENCE='+(netlify.length-gh.length));
}
