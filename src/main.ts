import { bootstrapApplication, provideProtractorTestingSupport } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import appRoutes from "./app/app.routes";
import { provideRouter } from "@angular/router";

bootstrapApplication(AppComponent, {
  providers: [
    provideProtractorTestingSupport(),
    provideRouter(appRoutes)
  ]
}).catch(err => console.error(err));
