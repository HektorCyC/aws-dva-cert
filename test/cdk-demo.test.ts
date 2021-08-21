import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as CdkPluralsight from '../lib/cdk-demo';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new CdkPluralsight.CdkDemo(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
