import sanityClient from "@sanity/client";
import sanityImageBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "eahhed5d",
  dataset: "production",
  apiVersion: "2022-03-10",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

export const builder = sanityImageBuilder(client);

export const urlFor = (source) => builder.image(source);
