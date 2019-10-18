/**
 *
 * DetalhesCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider, Card } from '@material-ui/core';
import { appUtils } from 'utils/appUtils';
import { useTheme } from '@material-ui/styles';

const DetalhesCard = ({
  label, value, subItems, ehDesconto,
}) => {
  const theme = useTheme();
  return (
    <Card
      style={{
        margin: 8,
        padding: 15,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" style={{ textTransform: 'uppercase' }}>
          {label}
        </Typography>
        {value !== false && (
        <Typography
          variant="h6"
          style={{
            color: ehDesconto ? theme.palette.error.main : theme.palette.success.main,
          }}
        >
          {ehDesconto
            ? appUtils.formatPrice(Math.abs(value.toFixed(2)))
            : appUtils.formatPrice(value.toFixed(2))}
        </Typography>
        )}
      </div>
      {subItems
        && subItems.map(item => (
          <React.Fragment key={item.id}>
            <Divider />
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="body2">
                {item.descricao}
              </Typography>
              <Typography variant="body2">
                {ehDesconto
                  ? appUtils.formatPrice(-Math.abs(item.valor.toFixed(2)))
                  : appUtils.formatPrice(item.valor.toFixed(2))}
              </Typography>
            </div>
          </React.Fragment>
        ))}
    </Card>
  );
};

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
