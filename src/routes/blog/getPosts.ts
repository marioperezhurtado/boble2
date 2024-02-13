import fs from "fs";

export async function getPosts() {
  return fs
    .readdirSync("src/routes/blog/_posts")
    .map((file) => {
      const [slug] = file.split(".");

      const fileContent = fs.readFileSync(
        `src/routes/blog/_posts/${file}`,
        "utf-8",
      );

      const [, frontmatter, content] = fileContent.split("---");

      const [, title, description, date] = frontmatter
        .split("\n")
        .map((line) => line.split(": ")[1]);

      return { slug, title, description, date: new Date(date), content };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}
