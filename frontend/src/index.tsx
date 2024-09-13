// Copyright (c) 2022-2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { HelmetProvider } from "react-helmet-async";
import { HgReact } from "./io/hyperify/frontend/HgReact";
import { HgReactContext } from "./io/hyperify/frontend/HgReactContext";
import { HgFrontend } from "./io/hyperify/frontend/HgFrontend";
import { UTMService } from "./io/hyperify/frontend/services/UTMService";
import { ChessApp } from './game/components/chessApp/ChessApp';
import './game/styles/chess-index.scss';
import "./i18n";

HgFrontend.initialize();
UTMService.initialize();
HgReact.initialize(
    <HelmetProvider>
        <HgReactContext>
            <ChessApp />
        </HgReactContext>
    </HelmetProvider>
);
