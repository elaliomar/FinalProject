export type NewsData = {
    id:string,
    title:string,
    link?:string,
    description?:string,
    pubDate?:string,
    image_url:string,
    source_id:string,
    country?:[],
    category?:[],
    keywords?:[]
}