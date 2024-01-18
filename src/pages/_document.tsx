import { Head, Html, Main, NextScript } from "next/document";

import { cn } from "@/lib/utils";
import { fontSpoqaHanSansNeo } from "@/styles/fonts";

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body
				className={cn(
					"min-h-screen bg-background font-spoqa antialiased",
					fontSpoqaHanSansNeo.variable,
				)}
			>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
