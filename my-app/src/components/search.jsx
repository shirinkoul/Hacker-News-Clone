import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSearchGlobalContext } from "./searchContext";
import SearchAppBar from "./searchAppBar";
import "./search.css";

const SearchFilters = () => {
  const {
    hits,
    query,
    searchText,
    content,
    selectContent,
    API,
    selectPopularity,
    duration,
    selectDuration
  } = useSearchGlobalContext();

  const [showComment, setShowComment] = React.useState(content.type!=='story'?true:false);
  console.log(hits);
  const commentArray = hits?.filter((data) => {
    return data?._tags?.includes("comment");
  })
  const storyArray = hits?.filter((data) => {
    return data?._tags?.includes("story");
  })
  return (
    <div>
        <div className="searchTitle">
          <span className="text">HACKER NEWS SEARCH</span>
          <form onSubmit={(evt) => evt.preventDefault()}>
              <input className="searchBox"
                type="text"
                value={query}
                placeholder="Search"
                onChange={(evt) => searchText(evt.target.value)}
              />
          </form>
        </div>
      <div className="filters">
      <span className="text"> Search </span>
        <Box sx={{ display: "inline" }}>
          <FormControl>
            <InputLabel id="content">Content</InputLabel>
            <Select
              //   labelId="content"
              id="content"
              value={content}
              label={content}
              onChange={(evt) => selectContent(evt.target.value)}
            >
              <MenuItem value={"(story,comment)"}>All</MenuItem>
              <MenuItem value={"story"}>Stories</MenuItem>
              <MenuItem value={"comment"}>Comments</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <span className="text"> by  </span>
        <Box sx={{ display: "inline" }}>
          <FormControl>
            <InputLabel id="popularity">Popularity</InputLabel>
            <Select
              //   labelId="Popularity"
              id="popularity"
              value={API}
              label={API}
              onChange={(evt) => selectPopularity(evt.target.value)}
            >
              <MenuItem value={`http://hn.algolia.com/api/v1/search?`}>
                Popularity
              </MenuItem>
              <MenuItem value={`http://hn.algolia.com/api/v1/search_by_date?`}>
                Date
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <span
          className="text"> for
        </span>
        <Box sx={{ display: "inline" }}>
        
        <FormControl>
          <InputLabel id="duration">Duration</InputLabel>
          <Select
            //   labelId="content"
            id="duration"
            value={duration}
            label={duration}
            onChange={(evt) => selectDuration(evt.target.value)}
          >
            <MenuItem value={-1}>All time</MenuItem>
            <MenuItem value={Math.floor(Date.now() / 1000 - 24 * 60 * 60)}>
              Last 24h
            </MenuItem>
            <MenuItem value={Math.floor(Date.now() / 1000 - 7 * 24 * 60 * 60)}>
              Past Week
            </MenuItem>
            <MenuItem value={Math.floor(Date.now() / 1000 - 30 * 24 * 60 * 60)}>
              Past Month
            </MenuItem>
            <MenuItem value={Math.floor(Date.now() / 1000 - 365 * 24 * 60 * 60)}>
              Past Year
            </MenuItem>
            {/* <MenuItem value={"comment"}>Custom Range</MenuItem> */}
          </Select>
        </FormControl>
        </Box>

      </div>
      <div className="news-div">
        {storyArray?.map((curPost) => {
          const { _highlightResult, objectID, url, points, author } = curPost;
          const title = _highlightResult?.title?.value;
          let point = "point",
            val = points;
          if (points > 1) point += "s";
          else if (points == null) val = 0;
          if (title == null) return <></>;
          return (
            
            <div className="news" key={objectID}>
              {/* {console.log(showComment)} */}
              {/* {showComment && <div>comment </div>} */}
              <span>
                <h4 className="title"> {title} </h4>
                <a href={url} target="_blank">
                  (Read More)
                </a>
              </span>
              <p className="news-details">
                {val} {point} by {author} | past | discuss
              </p>
            </div>
          );
        })}
        {commentArray?.map((curPost) => {
          const { _highlightResult, objectID, url, points, author } = curPost;
          const title = _highlightResult?.comment_text?.value;
          let point = "point",
            val = points;
          if (points > 1) point += "s";
          else if (points == null) val = 0;
          if (title == null) return <></>;
          return (
            
            <div className="news" key={objectID}>
              {/* {showComment && <div>comment </div>} */}
              <span>
                <h4 className="title"> {title} </h4>
                <a href={url} target="_blank">
                  (Read More)
                </a>
              </span>
              <p className="news-details">
                {val} {point} by {author} | past | discuss
              </p>
            </div>
          );
        })}
        {storyArray?.map((curPost) => {
          const { _highlightResult, objectID, url, points, author } = curPost;
          const title = _highlightResult?.title?.value;
          let point = "point",
            val = points;
          if (points > 1) point += "s";
          else if (points == null) val = 0;
          if (title == null) return <></>;
          return (
            
            <div className="news" key={objectID}>
              {/* {showComment && <div>comment </div>} */}
              <span>
                <h4 className="title"> {title} </h4>
                <a href={url} target="_blank">
                  (Read More)
                </a>
              </span>
              <p className="news-details">
                {val} {point} by {author} | past | discuss
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Search = () => {
  const {
    hits,
    loading,
  } = useSearchGlobalContext();

  if (loading) {
    return (
      <>
        <SearchFilters/>
        <h2>Loading..</h2>
      </>
    );
  }
 
  if (hits.length == 0)
      return <><SearchFilters/><h2>No Results</h2></>;

  return <SearchFilters />;
};
//SEARCH API SE QUERY SEARCH RESULTS ARE FINE BUT WITH SEARCHBYDATE API QUERY RESULTS ARE MESSED UP
export default Search;

