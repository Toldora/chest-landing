import handlebars from 'handlebars';
import svgIconTemplate from '@/partials/svg-icon.hbs?raw';
import authTypeRadioTemplate from '@/partials/auth-type-radio.html?raw';
import chestTemplate from '@/partials/wheel.html?raw';

handlebars.registerPartial('svg-icon', svgIconTemplate);
handlebars.registerPartial('auth-type-radio', authTypeRadioTemplate);
handlebars.registerPartial('wheel', chestTemplate);

handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

handlebars.registerHelper('isGreaterOrEqual', function (arg1, arg2, options) {
  return arg1 >= arg2 ? options.fn(this) : options.inverse(this);
});
