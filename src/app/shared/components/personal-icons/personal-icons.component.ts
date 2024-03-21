import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export const ICONLIST = {
  category: `
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 6h16" />
  <path d="M7 12h13" />
  <path d="M10 18h10" />
  `,
  dark: `
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M12 19a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" stroke-width="0" fill="currentColor" />
  <path d="M18.313 16.91l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.218 -1.567l.102 .07z" stroke-width="0" fill="currentColor" />
  <path d="M7.007 16.993a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z" stroke-width="0" fill="currentColor" />
  <path d="M4 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" stroke-width="0" fill="currentColor" />
  <path d="M21 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" stroke-width="0" fill="currentColor" />
  <path d="M6.213 4.81l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.217 -1.567l.102 .07z" stroke-width="0" fill="currentColor" />
  <path d="M19.107 4.893a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z" stroke-width="0" fill="currentColor" />
  <path d="M12 2a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" stroke-width="0" fill="currentColor" />
  <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" stroke-width="0" fill="currentColor" />
  `,
  light: `
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z" stroke-width="0" fill="currentColor" />
  `,
  ghost: `
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M5 11a7 7 0 0 1 14 0v7a1.78 1.78 0 0 1 -3.1 1.4a1.65 1.65 0 0 0 -2.6 0a1.65 1.65 0 0 1 -2.6 0a1.65 1.65 0 0 0 -2.6 0a1.78 1.78 0 0 1 -3.1 -1.4v-7" />
  <path d="M10 10l.01 0" />
  <path d="M14 10l.01 0" />
  <path d="M10 14a3.5 3.5 0 0 0 4 0" />
  `,
  search: `
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
  <path d="M21 21l-6 -6" />
  `,
  chevronLeft: `
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M15 6l-6 6l6 6" />
  `,
  chevronRight: `
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M9 6l6 6l-6 6" />
  `,
  heart: `
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" stroke-width="0" fill="currentColor" />
  `,
  x: `
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M18 6l-12 12" />
  <path d="M6 6l12 12" />
  `
}

export type IconNamesTypes = keyof typeof ICONLIST

@Component({
  selector: 'personal-icons',
  standalone: true,
  imports: [],
  templateUrl: './personal-icons.component.html',
  styleUrl: './personal-icons.component.scss'
})
export class PersonalIconsComponent {
  @Input({ required: true }) iconName!: IconNamesTypes;
  @Input() stroke: string = '1.5';

  currentIcon!: SafeHtml;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.currentIcon = this.domSanitizer.bypassSecurityTrustHtml(
      ICONLIST[this.iconName]
    );
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['iconName']) {
      this.currentIcon = this.domSanitizer.bypassSecurityTrustHtml(
        ICONLIST[this.iconName]
      );
    }
  }

  platformValidate() {
    return isPlatformBrowser(this.platformId)
  }
}
