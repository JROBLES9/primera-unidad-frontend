'use client'

// Third-party Imports
import Image from 'next/image'

import styled from '@emotion/styled'

const LogoText = styled.span`
  color: ${({ color }) => color ?? 'var(--mui-palette-text-primary)'};
  font-size: 1.25rem;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: 0.15px;
  text-transform: uppercase;
  margin-inline-start: 10px;
`

const Logo = ({ color }) => {
  return (
    <div className='flex items-center min-bs-[24px]'>
      <Image src='/images/logos/laBendicionLogo.png' alt='Logo' width={50} height={50} />
      <LogoText color={color}>La Bendición</LogoText>
    </div>
  )
}

export default Logo
