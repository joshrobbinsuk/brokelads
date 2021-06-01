import React from "react";
import { makeStyles } from "@material-ui/core";
import AltText from "../components/subcomponents/AltText";
import FixtureList from "../components/FixtureList";
import BetConfirmationModal from "../components/BetConfirmationModal";

const useStyles = makeStyles(() => ({
  outerListContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

// const Fixtures = () => {
//   const classes = useStyles();
//   return (
//     <>
//       <div className={classes.outerListContainer}>
//         <div className={classes.innerListContainer}>
//           <FixtureList />
//         </div>
//       </div>
//       <BetConfirmationModal />
//     </>
//   );
// };

const Fixtures = () => {
  return (
    <AltText content="Brokelads will return soon with the new football season" />
  );
};

export default Fixtures;
