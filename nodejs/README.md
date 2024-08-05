# Speechify API Node.js SDK

This is the official Node.js SDK for the Speechify API.

Read the SDK full reference [here](https://speechifyinc.github.io/speechify-api-sdks/nodejs).

Read the REST API documentation [here](https://docs.sws.speechify.com/docs/overview).

## Installation

```bash
npm install @speechify/api-sdk
```

## Usage

### Server-Side Audio Generation

```typescript
import { Speechify } from "@speechify/api-sdk";

const speechify = new Speechify({
	apiKey: "YOUR_API_KEY",
});

const text = "Hello, world!";
const response = await speechify.audioGenerate({
	input: text,
	voiceId: "george",
	audioFormat: "mp3",
});
const audio = response.audioData;

someStorage.saveFile("audio.mp3", audio);
```

### Server-Side Auth Token Generation

```typescript
import { Speechify } from "@speechify/api-sdk";

const speechify = new Speechify({
	apiKey: "YOUR_API_KEY",
});

webServer.post("/speechify-token", async (req, res) => {
	const user = req.user;
	if (!user) {
		res.status(401).send("Unauthorized");
		return;
	}
	const tokenResponse = await speechify.issueAccessToken();
	res.json(tokenResponse);
});
```

### Client-Side Audio Generation

```typescript
import { Speechify } from "@speechify/api-sdk";

const speechify = new Speechify();

authSystem.on("login", async () => {
	const res = await fetch("/speechify-token", {
		method: "POST",
	});
	const tokenResponse = await res.json();

	speechify.setAccessToken(tokenResponse.accessToken);
});

generateButton.addEventListener("click", async () => {
	const text = "Hello, world!";
	const response = await speechify.audioGenerate({
		input: text,
		voiceId: "george",
		audioFormat: "mp3",
	});
	const audio = response.audioData;

	const audioElement = new Audio();
	audioElement.src = URL.createObjectURL(
		new Blob([audio], { type: "audio/mpeg" })
	);
	audioElement.play();
});
```
