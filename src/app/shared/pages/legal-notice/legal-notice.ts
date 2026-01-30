import { Component } from '@angular/core';
import { Navbar } from "../../components/elements/navbar/navbar";
import { Footer } from "../../components/elements/footer/footer";

@Component({
  selector: 'app-legal-notice',
  imports: [Navbar, Footer],
  templateUrl: './legal-notice.html',
  styleUrl: './legal-notice.scss',
})
export class LegalNotice {

}
