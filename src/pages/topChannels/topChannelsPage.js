import './styles.scss';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { OpportunityCostApiProxy } from '../../domain/opportunityCostApiProxy';
import { Stack, Container} from '@mui/system';
import Typography from '@mui/material/Typography';

import InfiniteScroll from 'react-infinite-scroll-component';
import { abbreviateNumber } from "js-abbreviation-number";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import CostByTypeMap, {CostTypes} from '../../domain/costTypes';

function TopChannelsPage(props) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [costType, setCostType] = useState(Object.values(CostTypes)[0])

  useEffect(() => {
    loadMoreResults()
  }, [])

  const getOpportunityCostByType = (totalSeconds, opportunityCostType) => {
    let secondsOfType = CostByTypeMap[opportunityCostType];
    const calc = totalSeconds/secondsOfType;
    console.log(opportunityCostType)

	  const roundedCostValue = Math.floor(calc);
    return abbreviateNumber(roundedCostValue);
  }

  const loadMoreResults = () => {
    const pageSize = 20
    OpportunityCostApiProxy.getTopChannels(page, pageSize, (pagedResults) => {
      let newResultsList = [...results, ...pagedResults]
      newResultsList.map((result) => {
        console.log(result)
        result.costByType = getOpportunityCostByType(result.opportunityCost, costType)
        return result;
      });

      setResults(newResultsList)
      setPage(page + 1);

      if (results.length > 100 || pagedResults.length < pageSize) {
        setHasMore(false);
      }
    }, (error) => {

    })
  }

  const onCostTypeSelected = (event) => {
    setCostType(event.target.value)

    const resultsCopy = [...results]
    resultsCopy.map((result, index) => {
      result.costByType = getOpportunityCostByType(result.opportunityCost, event.target.value);
      return result;
    })

    setResults(resultsCopy)
  }

	return (
		<div className='site-page-container top-channels-page'>
      <Stack direction="column" spacing={3}>
        <Typography variant="h4" align='center'>Top Offending Channels (so far)</Typography>
        <Container>
          <FormControl className="cost-type-dropdown-container" fullWidth>
            <InputLabel id="demo-simple-select-label">Cost Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={costType}
              label="Cost Type"
              onChange={onCostTypeSelected}
            >
              {
                Object.values(CostTypes).map((type, index) => {
                  return <MenuItem value={type}>{type}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </Container>
        <TableContainer component={Paper}>
          <InfiniteScroll
            dataLength={results.length}
            next={loadMoreResults}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
            <p style={{ textAlign: "center" }}>
            <b>End of the top 100 has been reached</b>
            </p>
            }
          >
            <Table aria-label="simple table" size="large">
              <TableHead>
                <TableRow>
                  <TableCell align="center"><b>#</b></TableCell>
                  <TableCell align="left"><b>Name</b></TableCell>
                  <TableCell align="center"><b>Cost</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {results.map((result, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell align="left" ><a href={"/?c=" + result._id}>{result.name}</a></TableCell>
                  <TableCell align="center">{result.costByType}</TableCell>
                </TableRow>
              ))}
              </TableBody>
            </Table>
          </InfiniteScroll>
        </TableContainer>
      </Stack>
    </div>
  )
}

export default TopChannelsPage;