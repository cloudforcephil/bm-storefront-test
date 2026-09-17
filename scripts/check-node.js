#!/usr/bin/env node

/**
 * Copyright 2026 Salesforce, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const MIN_MAJOR = 24;
const major = Number.parseInt(process.versions.node.split('.')[0], 10);

if (Number.isNaN(major) || major < MIN_MAJOR) {
    console.error(
        `This storefront requires Node.js ${MIN_MAJOR}+ (current: ${process.version}).\n` +
            `Run \`nvm use\` in this directory (see .nvmrc), then \`pnpm dev\`.`
    );
    process.exit(1);
}
