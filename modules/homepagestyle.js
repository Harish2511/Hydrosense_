import { StyleSheet } from 'react-native';


const Styles = StyleSheet.create({
  "homeContainer": {
    width: "100%",
    display: "flex",
    overflow: "auto",
    minHeight: "100vh",
    alignItems: "center",
    flexDirection: "column"
  },
  "homeHeader": {
    width: "100%",
    border: "2px dashed rgba(120, 120, 120, 0.4)",
    display: "flex",
    alignItems: "center",
    paddingTop: "var(--dl-space-space-oneandhalfunits)",
    flexDirection: "column",
    paddingBottom: "var(--dl-space-space-oneandhalfunits)",
    backgroundColor: "var(--dl-color-primary1-blue80)"
  },
  "homeHero": {
    flex: 0,
    width: "100%",
    height: "auto",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "var(--dl-color-primary1-blue80)"
  },
  "homeHero1": {
    width: "100%",
    display: "flex",
    maxWidth: "var(--dl-size-size-maxwidth)",
    minHeight: "auto",
    alignItems: "center",
    paddingTop: "var(--dl-space-space-sixunits)",
    paddingLeft: "var(--dl-space-space-threeunits)",
    paddingRight: "var(--dl-space-space-threeunits)",
    flexDirection: "column",
    paddingBottom: "var(--dl-space-space-sixunits)",
    justifyContent: "center"
  },
  "homeContainer01": {
    gap: 2,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  "homeHeroHeading": {
    color: "var(--dl-color-gray-white)",
    maxWidth: "800px",
    textAlign: "center",
    fontFamily: '"Raleway"',
    lineHeight: 1.6
  },
  "home-heroSubHeading": {
    color: "var(--dl-color-gray-white)",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 1.6
  },
  "homeBtnGroup": {
    gap: 1.5,
    display: "flex",
    alignItems: "center",
    flexDirection: "row"
  },
  "homeHeroButton1": {
    color: "var(--dl-color-gray-white)",
    fontSize: 18,
    transition: "0.3s",
    fontWeight: "300",
    paddingTop: "1.5rem",
    borderColor: "var(--dl-color-primary1-blue100)",
    borderWidth: 0,
    paddingLeft: "3rem",
    borderRadius: 45,
    paddingRight: "3rem",
    paddingBottom: "1.5rem",
    backgroundColor: "var(--dl-color-primary1-blue100)"
  },
  "homeHeroButton1:hover": {
    color: "var(--dl-color-gray-white)",
    borderColor: "rgba(41, 20, 119, 0.9)",
    backgroundColor: "rgba(41, 20, 119, 0.9)"
  },
  "homeHeroButton2": {
    color: "var(--dl-color-gray-white)",
    transition: "0.3s",
    fontWeight: "300",
    paddingTop: "var(--dl-space-space-unit)",
    borderColor: "transparent",
    paddingLeft: "var(--dl-space-space-twounits)",
    paddingRight: "var(--dl-space-space-twounits)",
    paddingBottom: "var(--dl-space-space-unit)",
    backgroundColor: "transparent"
  },
  "homeHeroButton2:hover": { borderColor: "var(--dl-color-gray-white)" },
  "homeDetails": {
    flex: 0 ,
    width: "100%",
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  "homeDetails1": {
    width: "100%",
    display: "flex",
    maxWidth: "var(--dl-size-size-maxwidth)",
    alignItems: "center",
    paddingTop: "var(--dl-space-space-fourunits)",
    paddingLeft: "var(--dl-space-space-threeunits)",
    paddingRight: "var(--dl-space-space-threeunits)",
    paddingBottom: "var(--dl-space-space-fourunits)",
    justifyContent: "space-between"
  },
  "homeContainer02": {
    flex: 1,
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  "homeText": {
    color: "var(--dl-color-primary1-blue80)",
    textAlign: "left",
    fontFamily: '"Raleway"',
    marginBottom: "var(--dl-space-space-oneandhalfunits)"
  },
  "homeDetailsHeading": {
    width: "80%",
    textAlign: "left",
    fontFamily: '"Raleway"',
    lineHeight: 1.6,
    marginBottom: "var(--dl-space-space-oneandhalfunits)"
  },
  "homeDetailsSubHeading": {
    color: "var(--dl-color-gray-800)",
    fontSize: 18,
    textAlign: "left",
    lineHeight: 1.6,
    marginBottom: "var(--dl-space-space-twounits)"
  },
  "homeDetailsImage": {
    width: "400px",
    height: "400px",
    objectFit: "cover",
    marginLeft: "var(--dl-space-space-fourunits)",
    borderRadius: 5
  },
  "homeFeatures": {
    flex: 0,
    width: "100%",
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  "homeFeaturesContainer": {
    flex: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "var(--dl-color-secondary-grey400)"
  },
  "homeFeatures1": {
    gap: 3,
    width: "100%",
    display: "flex",
    maxWidth: "var(--dl-size-size-maxwidth)",
    alignItems: "center",
    paddingTop: "var(--dl-space-space-fourunits)",
    paddingLeft: "var(--dl-space-space-threeunits)",
    paddingRight: "var(--dl-space-space-threeunits)",
    flexDirection: "column",
    paddingBottom: "var(--dl-space-space-fourunits)",
    justifyContent: "flex-start"
  },
  "homeContainer03": {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  "homeText03": {
    color: "var(--dl-color-primary1-blue80)",
    fontFamily: '"Raleway"',
    marginBottom: "var(--dl-space-space-oneandhalfunits)"
  },
  "homeFeaturesHeading": {
    fontFamily: '"Raleway"',
    lineHeight: 1.6,
    marginBottom: "var(--dl-space-space-oneandhalfunits)"
  },
  "homeFeaturesSubHeading": {
    color: "var(--dl-color-gray-800)",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 1.6
  },
  "homeContainer04": {
    width: "100%",
    display: "grid",
    gridGap: "var(--dl-space-space-twounits)",
    gridTemplateColumns: "1fr 1fr"
  },
  "homePricing": {
    flex: 0,
    width: "100%",
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  "homePricing1": {
    gap: 2,
    width: "100%",
    display: "flex",
    alignItems: "center",
    paddingTop: "var(--dl-space-space-fourunits)",
    paddingLeft: "var(--dl-space-space-threeunits)",
    paddingRight: "var(--dl-space-space-threeunits)",
    flexDirection: "column",
    paddingBottom: "var(--dl-space-space-fourunits)",
    justifyContent: "center",
    backgroundColor: "var(--dl-color-gray-white)"
  },
  "homeContainer05": {
    gap: 0,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  "homeText06": {
    color: "var(--dl-color-primary1-blue80)",
    fontFamily: '"Raleway"',
    marginBottom: "var(--dl-space-space-oneandhalfunits)"
  },
  "homePricingHeading": {
    fontFamily: '"Raleway"',
    lineHeight: 1.6,
    marginBottom: "var(--dl-space-space-oneandhalfunits)"
  },
  "homePricingSubHeading": {
    color: "var(--dl-color-gray-800)",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 1.6
  },
  "homeContainer06": {
    gap: 2,
    width: "100%",
    display: "flex",
    maxWidth: "var(--dl-size-size-maxwidth)",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  "homePricingCard": {
    gap: 2,
    width: "100%",
    height: "auto",
    display: "flex",
    padding: "var(--dl-space-space-threeunits)",
    maxWidth: "450px",
    minHeight: "450px",
    alignItems: "flex-start",
    paddingTop: "var(--dl-space-space-twounits)",
    paddingLeft: "var(--dl-space-space-twounits)",
    borderRadius: 8,
    paddingRight: "var(--dl-space-space-twounits)",
    flexDirection: "column",
    paddingBottom: "var(--dl-space-space-twounits)",
    justifyContent: "space-between",
    backgroundColor: "var(--dl-color-primary1-blue60)"
  },
  "homeContainer07": {
    gap: 1.5,
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  "homeText09": {
    fontFamily: '"Raleway"',
    fontWeight: "300",
    textTransform: "uppercase"
  },
  "homeFreePlanDescription": { lineHeight: 1.6 },
  "homeContainer08": {
    display: "flex",
    alignItems: "center",
    marginBottom: "var(--dl-space-space-twounits)",
    flexDirection: "row"
  },
  "homeText10": {
    fontSize: 1.15,
    marginTop: "var(--dl-space-space-twounits)",
    fontWeight: "300"
  },
  "homeFreePlanPrice": { fontSize: 4, fontWeight: "700" },
  "homeContainer09": {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "var(--dl-space-space-unit)",
    flexDirection: "column"
  },
  "homeContainer10": {
    gap: 4,
    flex: 0,
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "var(--dl-space-space-unit)",
    flexDirection: "row"
  },
  "homeText13": { color: "var(--dl-color-gray-800)" },
  "homeFreePlanFeatures": { color: "var(--dl-color-gray-800)" },
  "homeContainer11": {
    gap: 4,
    flex: 0,
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "var(--dl-space-space-unit)",
    flexDirection: "row"
  },
  "homeText14": { color: "var(--dl-color-gray-800)" },
  "homeFreePlanFeatures1": {
    color: "var(--dl-color-gray-800)",
    lineHeight: 1.6
  },
  "homeContainer12": {
    gap: 4,
    flex: 0,
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "var(--dl-space-space-unit)",
    flexDirection: "row"
  },
  "homeText15": { color: "var(--dl-color-gray-800)" },
  "homeFreePlanFeatures2": {
    color: "var(--dl-color-gray-800)",
    lineHeight: 1.6
  },
  "homeContainer13": {
    gap: 4,
    flex: 0,
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "var(--dl-space-space-unit)",
    flexDirection: "row"
  },
  "homeText16": { color: "var(--dl-color-gray-800)" },
  "homeFreePlanFeatures3": {
    color: "var(--dl-color-gray-800)",
    lineHeight: 1.6
  },
  "homeButton": {
    color: "var(--dl-color-gray-black)",
    width: "100%",
    marginTop: "auto",
    transition: "0.3s",
    fontWeight: "700",
    paddingTop: "1rem",
    borderColor: "var(--dl-color-primary1-blue100)",
    borderRadius: 45,
    paddingBottom: "1rem",
    backgroundColor: "transparent"
  },
  "homeButton:hover": {
    borderColor: "rgba(41, 20, 119, 0.9)",
    backgroundColor: "rgba(217, 217, 217, 0.1)"
  },
  "homePricingCard1": {
    gap: 2,
    width: "100%",
    display: "flex",
    padding: "var(--dl-space-space-twounits)",
    maxWidth: "450px",
    minHeight: "450px",
    alignItems: "flex-start",
    borderRadius: 8,
    flexDirection: "column",
    backgroundColor: "var(--dl-color-primary1-blue60)"
  },
  "homeContainer14": {
    gap: 1.5,
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  "homeText17": {
    fontFamily: '"Raleway"',
    fontWeight: "300",
    textTransform: "uppercase"
  },
  "homeBasicPlanDescription": { lineHeight: 1.6 },
  "homeContainer15": {
    display: "flex",
    alignItems: "center",
    marginBottom: "var(--dl-space-space-twounits)",
    flexDirection: "row"
  },
  "homeText18": {
    fontSize: 1.15,
    marginTop: "var(--dl-space-space-twounits)",
    fontWeight: "300"
  },
  "homeBasicPlanPricing": { fontSize: 4, fontWeight: "700" },
  "homeText21": {
    fontSize: 1.15,
    fontStyle: "normal",
    marginTop: "var(--dl-space-space-twounits)",
    fontWeight: "300"
  },
  "homeContainer16": {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "var(--dl-space-space-threeunits)",
    flexDirection: "column"
  },
  "homeContainer17": {
    gap: 4,
    flex: 0,
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "var(--dl-space-space-unit)",
    flexDirection: "row"
  },
  "homeText22": { color: "var(--dl-color-gray-800)" },
  "homeText23": { color: "var(--dl-color-gray-800)" },
  "homeContainer18": {
    gap: 4,
    flex: 0,
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "var(--dl-space-space-unit)",
    flexDirection: "row"
  },
  "homeText24": { color: "var(--dl-color-gray-800)" },
  "homeBasicPlanFeatures": {
    color: "var(--dl-color-gray-800)",
    lineHeight: 1.6
  },
  "homeContainer19": {
    gap: 4,
    flex: 0,
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "var(--dl-space-space-unit)",
    flexDirection: "row"
  },
  "homeText25": { color: "var(--dl-color-gray-800)" },
  "homeBasicPlanFeatures1": {
    color: "var(--dl-color-gray-800)",
    lineHeight: 1.6
  },
  "homeContainer20": {
    gap: 4,
    flex: 0,
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "var(--dl-space-space-unit)",
    flexDirection: "row"
  },
  "homeText26": { color: "var(--dl-color-gray-800)" },
  "homeBasicPlanFeatures2": {
    color: "var(--dl-color-gray-800)",
    lineHeight: 1.6
  },
  "homeContainer21": {
    gap: 4,
    flex: 0,
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "var(--dl-space-space-unit)",
    flexDirection: "row"
  },
  "homeText27": { color: "var(--dl-color-gray-800)" },
  "homeBasicPlanFeatures3": {
    color: "var(--dl-color-gray-800)",
    lineHeight: 1.6
  },
  "homeButton1": {
    color: "var(--dl-color-gray-white)",
    width: "100%",
    marginTop: "auto",
    transition: "0.3s",
    fontWeight: "700",
    paddingTop: "1rem",
    borderColor: "rgba(41, 20, 119, 0.9)",
    borderWidth: 0,
    borderRadius: 45,
    paddingBottom: "1rem",
    backgroundColor: "var(--dl-color-primary1-blue100)"
  },
  "homeButton1:hover": {
    borderColor: "rgba(41, 20, 119, 0.9)",
    backgroundColor: "rgba(41, 20, 119, 0.9)"
  },
  "homePricingCard2": {
    gap: 2,
    width: "100%",
    display: "flex",
    padding: "var(--dl-space-space-threeunits)",
    maxWidth: "450px",
    minHeight: "450px",
    alignItems: "flex-start",
    paddingTop: "var(--dl-space-space-twounits)",
    paddingLeft: "var(--dl-space-space-twounits)",
    borderRadius: 8,
    paddingRight: "var(--dl-space-space-twounits)",
    flexDirection: "column",
    paddingBottom: "var(--dl-space-space-twounits)",
    backgroundColor: "var(--dl-color-primary1-blue60)"
  },
  "homeContainer22": {
    gap: 1.5,
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  "homeText28": {
    fontFamily: '"Raleway"',
    fontWeight: "300",
    textTransform: "uppercase"
  },
  "homeProPlanDescription": { lineHeight: 1.6 },
  "homeContainer23": {
    display: "flex",
    alignItems: "center",
    marginBottom: "var(--dl-space-space-twounits)",
    flexDirection: "row"
  },
  "homeText31": {
    fontSize: 1.15,
    marginTop: "var(--dl-space-space-twounits)",
    fontWeight: "300"
  },
  "homeProPlanPricing": { fontSize: 4, fontWeight: "700" },
  "homeText34": {
    fontSize: 1.15,
    fontStyle: "normal",
    marginTop: "var(--dl-space-space-twounits)",
    fontWeight: "300"
  },
  "homeContainer24": {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "var(--dl-space-space-unit)",
    flexDirection: "column"
  },
  "homeContainer25": {
    flex: 0,
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "var(--dl-space-space-unit)",
    flexDirection: "row"
  },
  "homeText35": { color: "var(--dl-color-gray-800)" },
  "homeText36": { color: "var(--dl-color-gray-800)", lineHeight: 1.6 },
  "homeContainer26": {
    gap: 4,
    flex: 0,
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "var(--dl-space-space-unit)",
    flexDirection: "row"
  },
  "homeText37": { color: "var(--dl-color-gray-800)" },
  "homeProPlanFeatures": {
    color: "var(--dl-color-gray-800)",
    lineHeight: 1.6
  },
  "homeContainer27": {
    gap: 4,
    flex: 0,
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "var(--dl-space-space-unit)",
    flexDirection: "row"
  },
  "homeText38": { color: "var(--dl-color-gray-800)" },
  "homeProPlanFeatures1": {
    color: "var(--dl-color-gray-800)",
    lineHeight: 1.6
  },
  "homeContainer28": {
    gap: 4,
    flex: 0,
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "var(--dl-space-space-unit)",
    flexDirection: "row"
  },
  "homeText39": { color: "var(--dl-color-gray-800)" },
  "homeProPlanFeatures2": {
    color: "var(--dl-color-gray-800)",
    lineHeight: 1.6
  },
  "homeButton2": {
    color: "var(--dl-color-gray-white)",
    width: "100%",
    marginTop: "auto",
    transition: "0.3s",
    fontWeight: "700",
    paddingTop: "1rem",
    borderColor: "#3d6e70ff",
    borderWidth: 0,
    borderRadius: 45,
    paddingBottom: "1rem",
    backgroundColor: "var(--dl-color-primary1-blue100)"
  },
  "homeButton2:hover": {
    borderColor: "rgba(41, 20, 119, 0.9)",
    backgroundColor: "rgba(41, 20, 119, 0.9)"
  },
  "homeGallery": {
    flex: 0,
    width: "100%",
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  "homeGallery1": {
    gap: 1.5,
    width: "100%",
    display: "flex",
    maxWidth: "var(--dl-size-size-maxwidth)",
    alignItems: "center",
    paddingTop: "var(--dl-space-space-fourunits)",
    paddingLeft: "var(--dl-space-space-threeunits)",
    paddingRight: "var(--dl-space-space-threeunits)",
    flexDirection: "column",
    paddingBottom: "var(--dl-space-space-fourunits)"
  },
  "homeGalleryHeading": {
    textAlign: "center",
    fontFamily: '"Raleway"',
    lineHeight: 1.6
  },
  "homeGallerySubHeading": {
    color: "rgb(153, 153, 153)",
    textAlign: "center",
    lineHeight: 1.6,
    paddingLeft: "var(--dl-space-space-threeunits)",
    paddingRight: "var(--dl-space-space-threeunits)"
  },
  "homeContainer29": {
    width: "100%",
    display: "grid",
    gridGap: "var(--dl-space-space-unit)",
    marginTop: "var(--dl-space-space-twounits)",
    gridTemplateColumns: "1fr 1fr 1fr 1fr"
  },
  "homeBanner": {
    flex: 0,
    width: "100%",
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--dl-color-gray-black)"
  },
  "homeBanner1": {
    gap: 1.5,
    width: "var(--dl-size-size-maxwidth)",
    display: "flex",
    alignItems: "center",
    paddingTop: "var(--dl-space-space-sixunits)",
    paddingLeft: "var(--dl-space-space-fiveunits)",
    paddingRight: "var(--dl-space-space-fiveunits)",
    flexDirection: "column",
    paddingBottom: "var(--dl-space-space-sixunits)",
    justifyContent: "flex-start"
  },
  "homeBannerHeading": {
    color: "var(--dl-color-gray-white)",
    textAlign: "center",
    fontFamily: '"Raleway"',
    lineHeight: 1.6
  },
  "homeBannerSubHeading": {
    color: "var(--dl-color-gray-white)",
    maxWidth: "var(--dl-size-size-maxwidth)",
    textAlign: "center",
    lineHeight: 1.6
  },
  "homeBannerButton": {
    color: "var(--dl-color-gray-white)",
    transition: "0.3s",
    fontWeight: "700",
    paddingTop: "1.5rem",
    borderWidth: 0,
    paddingLeft: "3rem",
    borderRadius: 45,
    paddingRight: "3rem",
    paddingBottom: "1.5rem",
    backgroundColor: "var(--dl-color-primary1-blue100)"
  },
  "homeBannerButton:hover": {
    borderColor: "rgba(41, 20, 119, 0.9)",
    backgroundColor: "rgba(41, 20, 119, 0.9)"
  },
  "homeFaq": {
    flex: 0,
    width: "100%",
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  "homeFaqContainer": {
    flex: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  "homeFaq1": {
    gap: 2,
    width: "100%",
    display: "flex",
    maxWidth: "var(--dl-size-size-maxwidth)",
    alignItems: "flex-start",
    paddingTop: "var(--dl-space-space-fourunits)",
    paddingLeft: "var(--dl-space-space-threeunits)",
    paddingRight: "var(--dl-space-space-threeunits)",
    flexDirection: "row",
    paddingBottom: "var(--dl-space-space-fourunits)"
  },
  "homeContainer30": {
    display: "flex",
    maxWidth: "35%",
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  "homeText40": {
    color: "var(--dl-color-primary1-blue80)",
    fontFamily: '"Raleway"',
    marginBottom: "var(--dl-space-space-oneandhalfunits)"
  },
  "homeText43": {
    fontFamily: '"Raleway"',
    lineHeight: 1.6,
    marginBottom: "var(--dl-space-space-oneandhalfunits)"
  },
  "homeText44": {
    color: "var(--dl-color-gray-800)",
    fontSize: 18,
    textAlign: "left",
    lineHeight: 1.6
  },
  "homeContainer31": {
    gap: 1.5,
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column"
  },
  "homeFooter": {
    flex: 0,
    width: "100%",
    border: "2px dashed rgba(120, 120, 120, 0.4)",
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--dl-color-gray-black)"
  },
  "@media (max-width: 991px)": {
    "homeHero1": { flexDirection: "column" },
    "homeContainer01": {
      alignItems: "center",
      marginRight: "0px",
      marginBottom: "var(--dl-space-space-twounits)",
      paddingRight: "0px"
    },
    "homeHeroHeading": { textAlign: "center" },
    "homeHeroSubHeading": {
      textAlign: "center",
      paddingLeft: "var(--dl-space-space-threeunits)",
      paddingRight: "var(--dl-space-space-threeunits)"
    },
    "homeDetailsSubHeading": {
      textAlign: "center",
      paddingLeft: "var(--dl-space-space-threeunits)",
      paddingRight: "var(--dl-space-space-threeunits)"
    },
    "homeFeaturesSubHeading": {
      textAlign: "center",
      paddingLeft: "var(--dl-space-space-threeunits)",
      paddingRight: "var(--dl-space-space-threeunits)"
    },
    "homePricingSubHeading": {
      textAlign: "center",
      paddingLeft: "var(--dl-space-space-threeunits)",
      paddingRight: "var(--dl-space-space-threeunits)"
    },
    "homeContainer06": { alignItems: "center", flexDirection: "column" },
    "homePricingCard": {
      width: "100%",
      padding: "var(--dl-space-space-twounits)",
      maxWidth: "450px"
    },
    "homePricingCard1": { width: "100%", maxWidth: "450px" },
    "homePricingCard2": { width: "100%", maxWidth: "450px" },
    "homeGallerySubHeading": { textAlign: "center" },
    "homeContainer29": { gridTemplateColumns: "1fr 1fr 1fr" },
    "homeBannerSubHeading": { maxWidth: "100%" },
    "homeText44": {
      textAlign: "center",
      paddingLeft: "var(--dl-space-space-threeunits)",
      paddingRight: "var(--dl-space-space-threeunits)"
    }
  },
  "@media (max-width: 767px)": {
    "homeHero1": {
      paddingLeft: "var(--dl-space-space-twounits)",
      paddingRight: "var(--dl-space-space-twounits)"
    },
    "homeHeroSubHeading": {
      paddingLeft: "var(--dl-space-space-unit)",
      paddingRight: "var(--dl-space-space-unit)"
    },
    "homeDetails1": {
      alignItems: "center",
      paddingLeft: "var(--dl-space-space-twounits)",
      paddingRight: "var(--dl-space-space-twounits)",
      flexDirection: "column",
      justifyContent: "center"
    },
    "homeContainer02": { alignItems: "center", justifyContent: "flex-start" },
    "homeText": { textAlign: "center" },
    "homeDetailsHeading": { textAlign: "center" },
    "homeDetailsSubHeading": {
      textAlign: "center",
      paddingLeft: "var(--dl-space-space-unit)",
      paddingRight: "var(--dl-space-space-unit)"
    },
    "homeDetailsImage": {
      marginTop: "var(--dl-space-space-threeunits)",
      marginLeft: "0px"
    },
    "homeFeatures1": {
      paddingLeft: "var(--dl-space-space-twounits)",
      paddingRight: "var(--dl-space-space-twounits)"
    },
    "homeFeaturesSubHeading": {
      paddingLeft: "var(--dl-space-space-unit)",
      paddingRight: "var(--dl-space-space-unit)"
    },
    "homeContainer04": { gridTemplateColumns: "1fr" },
    "homePricing1": {
      paddingLeft: "var(--dl-space-space-twounits)",
      paddingRight: "var(--dl-space-space-twounits)"
    },
    "homePricingSubHeading": {
      paddingLeft: "var(--dl-space-space-unit)",
      paddingRight: "var(--dl-space-space-unit)"
    },
    "homeContainer06": { alignItems: "center", flexDirection: "column" },
    "homePricingCard": {
      width: "100%",
      maxWidth: "450px",
      marginRight: "0px",
      marginBottom: "var(--dl-space-space-twounits)"
    },
    "homePricingCard1": {
      width: "100%",
      maxWidth: "450px",
      marginRight: "0px",
      marginBottom: "var(--dl-space-space-twounits)"
    },
    "homePricingCard2": {
      width: "100%",
      maxWidth: "450px",
      marginRight: "0px",
      marginBottom: "var(--dl-space-space-twounits)"
    },
    "homeGallery1": {
      paddingLeft: "var(--dl-space-space-twounits)",
      paddingRight: "var(--dl-space-space-twounits)"
    },
    "homeGallerySubHeading": {
      paddingLeft: "var(--dl-space-space-unit)",
      paddingRight: "var(--dl-space-space-unit)"
    },
    "homeContainer29": { gridTemplateColumns: "1fr 1fr" },
    "homeBanner1": {
      paddingLeft: "var(--dl-space-space-twounits)",
      paddingRight: "var(--dl-space-space-twounits)"
    },
    "homeBannerSubHeading": {
      paddingLeft: "var(--dl-space-space-unit)",
      paddingRight: "var(--dl-space-space-unit)"
    },
    "homeFaq1": {
      paddingLeft: "var(--dl-space-space-twounits)",
      paddingRight: "var(--dl-space-space-twounits)",
      flexDirection: "column"
    },
    "homeContainer30": {
      maxWidth: "100%",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center"
    },
    "homeText44": {
      paddingLeft: "var(--dl-space-space-unit)",
      paddingRight: "var(--dl-space-space-unit)"
    }
  },
  "@media (max-width: 479px)": {
    "homeHero1": {
      paddingTop: "var(--dl-space-space-twounits)",
      paddingLeft: "var(--dl-space-space-unit)",
      paddingRight: "var(--dl-space-space-unit)",
      paddingBottom: "var(--dl-space-space-twounits)"
    },
    "homeContainer01": { marginBottom: "var(--dl-space-space-unit)" },
    "homeBtnGroup": { flexDirection: "column" },
    "homeHeroButton2": {
      marginTop: "var(--dl-space-space-unit)",
      marginLeft: "0px"
    },
    "homeFeatures1": {
      paddingTop: "var(--dl-space-space-twounits)",
      paddingLeft: "var(--dl-space-space-unit)",
      paddingRight: "var(--dl-space-space-unit)",
      paddingBottom: "var(--dl-space-space-twounits)"
    },
    "homePricingCard2": { marginBottom: "0px" },
    "homeGallery1": { padding: "var(--dl-space-space-unit)" },
    "homeContainer29": { gridTemplateColumns: "1fr" },
    "homeBanner1": {
      paddingTop: "var(--dl-space-space-twounits)",
      paddingLeft: "var(--dl-space-space-unit)",
      paddingRight: "var(--dl-space-space-unit)",
      paddingBottom: "var(--dl-space-space-twounits)"
    }
  }
});
export { Styles }
