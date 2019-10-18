/**
 *
 * DetalhesCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { appUtils } from 'utils/appUtils';

const DetalhesCard = ({
  label, value, subItems, ehDesconto,
}) => (
  <div
    style={{
      marginTop: 8,
      padding: 15,
      backgroundColor: '#fff',
      elevation: 1,
    }}
  >
    <div
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Typography>
        {label}
      </Typography>
      {value !== false && (
      <Typography>
        {ehDesconto
          ? appUtils.formatPrice(-Math.abs(value.toFixed(2)))
          : appUtils.formatPrice(value.toFixed(2))}
      </Typography>
      )}
    </div>
    {subItems
        && subItems.map(item => (
          <React.Fragment key={item.id}>
            {/* <Divider /> */}
            <div
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Typography>{item.descricao}</Typography>
              <Typography>
                {ehDesconto
                  ? appUtils.formatPrice(-Math.abs(item.valor.toFixed(2)))
                  : appUtils.formatPrice(item.valor.toFixed(2))}
              </Typography>
            </div>
          </React.Fragment>
        ))}
  </div>
);

DetalhesCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  subItems: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  ehDesconto: PropTypes.bool,
};

DetalhesCard.defaultProps = {
  subItems: false,
  ehDesconto: true,
  value: false,
};

export default DetalhesCard;
