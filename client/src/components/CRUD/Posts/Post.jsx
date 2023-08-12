import React, { useEffect } from "react";
import { useState } from "react";
import { Typography, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { axiosPrivate } from "../../../API/axios";
import { useNavigate } from "react-router-dom";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const Post = () => {
  const [expanded, setExpanded] = useState("panel1");
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getData = async () => {
      try {
        const response = await axiosPrivate.get("/posts/", {
          signal: controller.signal,
        });

        console.log(response.data);
        isMounted && setPosts(response.data);
      } catch (error) {
        console.log(error);
        navigate("/", { replace: true });
      }
    };

    getData();

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Container
      sx={{
        backgroundColor: "#101418",
        margin: "20px auto",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      {posts.length ? (
        posts.map((post) => {
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              sx={{
                color: "white",
                backgroundColor: "#475058",
              }}
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography color="lightgreen"></Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: "#212529",
                color: "white",
              }}
            >
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
              <Typography
                sx={{
                  borderRadius: "10px",
                  padding: "1px",
                  backgroundColor: "#151719",
                  margin: "10px auto",
                }}
              >
                <Container
                  sx={{
                    color: "lightgreen",
                    margin: "0 auto",
                    maxWidth: "fit-content",
                  }}
                >
                  Author:
                </Container>
              </Typography>
            </AccordionDetails>
          </Accordion>;
        })
      ) : (
        <Accordion>
          <AccordionSummary>
            <Typography>No Content</Typography>
          </AccordionSummary>
        </Accordion>
      )}
    </Container>
  );
};

export default Post;
