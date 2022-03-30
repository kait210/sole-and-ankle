import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const getNameForVariant = (variant) => {
    switch(variant) {
      case 'on-sale':
        return 'Sale';
      case 'new-release':
        return 'Just Released!';
      default: 
        return;
    }
  }

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <Flag variant={variant}>{getNameForVariant(variant)}</Flag>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price variant={variant}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          <SalePrice hide={salePrice <= 0}>{formatPrice(salePrice)}</SalePrice>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Flag = styled.span`
  {
    position:relative;
    z-index: 1;
    top: 42px;
    color: ${COLORS.white};
    font-size: 14px;
    padding: 7px;
    border-radius: 2px;

    ${(props) => {
        switch(props.variant) {
          case 'on-sale':
            return `
                background: ${COLORS.primary};
                left: 312px; // brittle but it'll do
            `;
          case 'new-release':
            return `
                background: ${COLORS.secondary};
                left: 245px;
            `;
          default:
            return;
        }
      }
  }
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 312px;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div``;

const Image = styled.img`
  {
    width: 100%;
    border-radius: 16px 16px 4px 4px;
  }
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
    {
      /* default */
      color: ${COLORS.gray[900]};

      ${(props) => {
        if (props.variant === 'on-sale') {
          return `
            text-decoration: line-through; 
            color: ${COLORS.gray[700]};
          `
        }
      }
    }
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
  ${ props => props.hide && 'display: none' };
`;

export default ShoeCard;
