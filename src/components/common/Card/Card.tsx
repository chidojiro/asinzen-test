import classNames from 'classnames'

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  title?: string
}

const Card = ({ title, children, className, ...restProps }: Props) => {
  return (
    <div className={classNames('shadow bg-white px-6 py-3', className)} {...restProps}>
      <p className='text-center mb-3'>{title}</p>
      <div>{children}</div>
    </div>
  )
}

export default Card
