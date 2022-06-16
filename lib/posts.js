import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const postDirectory = path.join(process.cwd(), "posts");

export function getPosts() {
    const fileNames = fs.readdirSync(postDirectory);
    const allPosts = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postDirectory, fileName);
        const fileContent = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContent);
        const content = matterResult.content.toString().replace(/\n/, "");
        const snippet =
            content.length > 240 ? `${content.slice(0, 240)}...` : content;

        return {
            id,
            ...matterResult.data,
            snippet,
        };
    });

    return allPosts.sort(({ date: a }, { date: b }) => {
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    });
}

export function getPostsID() {
    const fileNames = fs.readdirSync(postDirectory);

    // returns array of obj
    {
        /**
         [
         {
                params: {
                    id: 'test-post'
                },
                {
                    params: {
                        id: 'another-bs-post
                    }
                }
            }
         ]
         */
    }

    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
}

export async function getPostData(id) {
    const fullPath = path.join(postDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContent);
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHTML = processedContent.toString();

    return {
        id,
        contentHTML,
        ...matterResult.data,
    };
}
