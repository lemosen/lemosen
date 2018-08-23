import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {enableProdMode} from "@angular/core";
import {AppModule} from "./app.module";
// import * as $ from "jquery";

enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);

// window["$"] = $;
// window["jQuery"] = $;
