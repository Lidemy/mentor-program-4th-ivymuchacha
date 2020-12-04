/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import { Filter, Flex, ClearAll } from '../style';

export default function Filters({ handleClear, handleFilter }) {
  const handleFilters = (e) => {
    handleFilter(e.target.value);
  };

  return (
    <div>
      <Flex>
        <Filter onClick={handleFilters} type="button" value="all" />
        <Filter onClick={handleFilters} type="button" value="completed" />
        <Filter onClick={handleFilters} type="button" value="undone" />
        <ClearAll onClick={handleClear}>Clear All</ClearAll>
      </Flex>
    </div>
  );
}

Filters.propTypes = {
  handleClear: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
};
