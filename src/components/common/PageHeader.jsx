import Breadcrumbs from './Breadcrumbs';

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="bg-gradient-primary pt-28 pb-12">
      <div className="container-custom">
        <Breadcrumbs />
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/70 mt-2 text-lg">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
