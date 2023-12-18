import prizesCtx from './prizes-ctx';
import socialCtx from './social-ctx';
import statisticCtx from './statistic-ctx';

export const TEMPLATE_CONTEXT = {
  chanceSectionCtx: { list: [...prizesCtx.list, ...prizesCtx.list] },

  boxContentsSectionCtx: prizesCtx,

  socialCtx,

  statisticCtx,
};
