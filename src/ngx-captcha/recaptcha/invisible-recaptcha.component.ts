import { Component, Input, OnChanges, Optional, Renderer2, SimpleChanges } from '@angular/core';

import { BaseReCaptchaComponent } from './base-recaptcha.component';
import { ReCaptchaType } from './recaptcha-type.enum';
import { NgxCaptchaConfig } from './recaptcha.config';


@Component({
  selector: 'ngx-invisible-recaptcha',
  template: `
  <div #captchaScriptElem></div>
  <div #captchaWrapperElem></div>`
})
export class InvisibleReCaptchaComponent extends BaseReCaptchaComponent implements OnChanges {

  /**
   * This size representing invisible captcha
   */
  protected readonly size = 'invisible';

  /**
   * Badge
   */
  @Input() badge: 'bottomright' | 'bottomleft' | 'inline' = 'bottomright';

  /**
   * Language code. Auto-detects the user's language if unspecified.
   */
  @Input() hl: string;

  constructor(
    protected renderer: Renderer2,
    @Optional() protected config: NgxCaptchaConfig,
  ) {
    super(renderer, ReCaptchaType.InvisibleReCaptcha, config);
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
  }

  /**
   * Programatically invoke the reCAPTCHA check. Used if the invisible reCAPTCHA is on a div instead of a button.
   */
  execute(): string | undefined {
    this.currentResponse = this.reCaptchaApi.execute(this.captchaId);

    this.resetCaptchaAfterSuccess = true;

    return this.currentResponse;
  }

  protected captchaSpecificSetup(): void {
  }

  /**
  * Gets reCaptcha properties
  */
  protected getCaptchaProperties(): any {
    return {
      'sitekey': this.siteKey,
      'callback': (response) => this.handleCallback(response),
      'badge': this.badge,
      'type': this.type,
      'tabindex': this.tabIndex,
      'size': this.size
    };
  }
}

