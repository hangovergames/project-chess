// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { parseNonEmptyString } from "../../io/hyperify/core/types/String";

export const FRONTEND_DEFAULT_LANGUAGE = 'fi';

export const PUBLIC_URL = parseNonEmptyString(process.env.PUBLIC_URL) ?? parseNonEmptyString(process.env.REACT_APP_PUBLIC_URL) ?? 'http://localhost:3000';
