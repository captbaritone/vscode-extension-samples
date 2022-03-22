/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';

import {
	Executable,
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	// The server is implemented in node
	/*
	const serverModule = context.asAbsolutePath(
		path.join('server', 'out', 'server.js')
	);
	*/

	// const serverPath = "/Users/captbaritone/projects/relay/compiler/target/release/relay-bin";
	const serverPath = "/Users/captbaritone/lsp.sh";
	// The debug options for the server
	// --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
	const debugOptions = { execArgv: [] };

	const args = ["relay.config.json", "--lsp"];

	const newEnv = Object.assign({}, process.env);
	Object.assign(newEnv, {});

	const run: Executable = {
		command: serverPath,
		args,
		options: { env: newEnv },
	};


	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	const serverOptions: ServerOptions = {
		run,
		debug: run,
	};

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: 'file', language: 'javascript' },
		{ scheme: 'file', language: 'typescript' },
		{ scheme: 'file', language: 'typescriptreact' },
		{ scheme: 'file', language: 'javascriptreact' },
		],

		// TODO: Config?
		// synchronize: {
		// Notify the server about file changes to '.clientrc files contained in the workspace
		//			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		//	}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'languageServerExample',
		'Language Server Example',
		serverOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
