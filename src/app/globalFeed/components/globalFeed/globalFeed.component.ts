import { Component } from "@angular/core";

@Component({
  selector: "mc-global-article",
  templateUrl: "/globalFeed.component.html",
  styleUrls: ["globalFeed.component.scss"],
})
export class GlobalFeedComponent {
  apiUrl = "/articles";
}
