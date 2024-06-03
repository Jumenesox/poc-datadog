import { Component, OnDestroy, OnInit} from '@angular/core';
import { datadogRum } from '@datadog/browser-rum';
import '@nx-example/shared/header';

@Component({
  selector: 'nx-example-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  //Sobre Frustration Signals, favor olhar: https://docs.datadoghq.com/real_user_monitoring/browser/frustration_signals/
  constructor(){
    datadogRum.init({
      applicationId: 'dd7a362a-646a-4a3a-bd75-855502ccca15',
      clientToken: 'pub3ce77f64710011dab66159c9a3bd23df',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'us3.datadoghq.com',
      service: 'guilda-exemplo',
      env: 'prod',
      // Specify a version number to identify the deployed version of your application in Datadog
      // version: '1.0.0', 
      sessionSampleRate: 100,
      sessionReplaySampleRate: 0,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: 'mask-user-input',
  });
  }

  ngOnInit(){
    datadogRum.addAction('Inicio da jornada do usuário no sistema');
  }

  ngOnDestroy(): void {
    // ATENÇÃO!!! O uso do stop session no destroy é imprescindivel, uma vez que a sessão do usuário não para automáticamente ao sair do fluxo.
    datadogRum.stopSession()
}
}
