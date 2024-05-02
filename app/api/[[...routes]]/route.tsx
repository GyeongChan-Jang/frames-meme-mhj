/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
import { pinata } from "frog/hubs";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";

const app = new Frog({
  basePath: "/api",
  hub: pinata(),
});

app.frame("/", (c) => {
  const { buttonValue, inputText, status } = c;
  const fruit = inputText || buttonValue;
  return c.res({
    action: "/picker",
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/preview.png`,
    intents: [<Button value="A">A</Button>, <Button value="B">B</Button>],
  });
});

app.frame("/picker", (c) => {
  const { buttonValue, verified } = c;

  if (verified) {
    if (buttonValue === "A") {
      return c.res({
        action: "/meme/a",
        image: `${process.env.NEXT_PUBLIC_SITE_URL}/meme/a`,
        intents: [
          <TextInput placeholder="Text" />,
          <Button value="generate">생성</Button>,
        ],
      });
    }

    return c.res({
      action: "/meme/b",
      image: `${process.env.NEXT_PUBLIC_SITE_URL}/meme/b`,
      imageAspectRatio: "1:1",
      intents: [
        <TextInput placeholder="Text" />,
        <Button value="generate">생성</Button>,
      ],
    });
  }

  return c.res({
    action: "/",
    image: (
      <div style={{ color: "white", display: "flex", fontSize: 60 }}>
        유요하지 않은 사용자입니다.
      </div>
    ),
    intents: [<Button>다시 시도! 🔄</Button>],
  });
});

app.frame("/meme/:id", (c) => {
  const id = c.req.param("id");

  const { frameData, verified } = c;

  const { inputText = "" } = frameData || {};

  if (verified) {
    const newSearchParams = new URLSearchParams({
      text: inputText,
    });

    if (id === "a") {
      return c.res({
        action: "/",
        image: `${process.env.NEXT_PUBLIC_SITE_URL}/meme/a?${newSearchParams}`,
        intents: [<Button>다시 만들기 🔄</Button>],
      });
    }

    return c.res({
      action: "/",
      image: `${process.env.NEXT_PUBLIC_SITE_URL}/meme/b?${newSearchParams}`,
      imageAspectRatio: "1:1",
      intents: [<Button>다시 만들기 🔄</Button>],
    });
  }

  return c.res({
    action: "/",
    image: (
      <div style={{ color: "white", display: "flex", fontSize: 60 }}>
        유효하지 않은 사용자입니다.
      </div>
    ),
    intents: [<Button>다시 시도 🔄</Button>],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
