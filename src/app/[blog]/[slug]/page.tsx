import { client } from "@/sanity/lib/client"; //sanityden veri çekmek için oluşturulmuş createClient fonksiyonuyla yapılandırışmış bir client
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity"; //block content türlerini düzgün bir şekilde render edilmesi için bir bileşen
import Image from "next/image";
export default async function page({params:{slug}}:{params:{slug:string}}) { //slug bu rotanın dinamik kısmıdır

  const query = `*[_type == 'blog' && slug.current == "${slug}"]{
  Title , Paragraph , image , block 
}[0]`; //sanitynin sorgu dilini kullanarak sluga göre bir blog yazısı çekilir. sadece blog türündeki belgeleri alır. slug.cureent=="${slug}" belirli slug ile eşlesen blogları filtreler. grei dönüdürlecek alanla title,paragraf,image ve blocktur. ilk eşleşen belgeyi alır [0]

    const data = await client.fetch(query) //sanityden gelen veriyi turar bu veri clientte kullanılacak


  return (
    <article className="mt-12 mb-24 px-2 2xl:px-12 flex flex-col gap-y-8">
   
      <h1 className="text-xl xs:text-3xl lg:text-5xl font-bold text-dark dark:text-light">
       {data.Title}
</h1>
     {/*sanityden gelen görselin urlini alıyoruz */}
      <Image
        src={urlFor(data.image).url()}
        width={500}
        height={500}
        alt="AI for everyone"
        className="rounded"
      />
   
      <section>
      <h2 className="text-xl xs:text-2xl md:text-3xl font-bold uppercase text-accentDarkPrimary">
        Summary
      </h2>
      <p className="text-base md:text-xl leading-relaxed text-justify text-dark/80 dark:text-light/80">
      {data.Paragraph}
      </p>
      </section>
      {/* Author Section (Image & Bio) */}
      <section className="px-2 sm:px-8 md:px-12 flex gap-2 xs:gap-4 sm:gap-6 items-start xs:items-center justify-start">
        {/*eklenen sabit görsel sanityden de çekilebilir */}
        <Image
          src={""}
          width={200}
          height={200}
          alt="author"
          className="object-cover rounded-full h-12 w-12 sm:h-24 sm:w-24"
        />
        
      </section>

      {/* Main Body of Blog */}
      <section className="text-lg leading-normal text-dark/80 dark:text-light/80">
        <PortableText value={data.block} />
      </section>

    </article>
  );
}