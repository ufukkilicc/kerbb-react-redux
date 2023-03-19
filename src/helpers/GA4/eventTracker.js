import ReactGA from "react-ga4";

export const eventTracker = (category, action, label) => {
  ("GA event:", category, ":", action, ":", label);
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};
