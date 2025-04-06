"use client";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { $getRoot, $getSelection } from "lexical";
import { useEffect } from "react";

const theme = {};

function onChange(editorState: { read: (arg0: () => void) => void }) {
	editorState.read(() => {
		const root = $getRoot();
		const selection = $getSelection;
		console.log(root, selection);
	});
}

function MyCustomAutoFocusPlugin() {
	const [editor] = useLexicalComposerContext();
	useEffect(() => {
		editor.focus();
	}, [editor]);
	return null;
}

function onError(error: Error) {
	throw error;
}

export function Editor() {
	const initialConfig = {
		namespace: "MyEditor",
		theme,
		onError,
	};

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<PlainTextPlugin
				contentEditable={
					<ContentEditable
						aria-placeholder={"Enter some text..."}
						placeholder={<div>Enter some text...</div>}
					/>
				}
				ErrorBoundary={LexicalErrorBoundary}
			/>
			<OnChangePlugin onChange={onChange} />
			<MyCustomAutoFocusPlugin />
		</LexicalComposer>
	);
}
export default Editor;
