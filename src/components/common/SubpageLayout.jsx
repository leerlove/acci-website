import PageHeader from './PageHeader';
import SubpageSidebar from './SubpageSidebar';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const SubpageLayout = ({ title, subtitle, sectionPath, children }) => {
  useDocumentTitle(title);

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      <div className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <SubpageSidebar sectionPath={sectionPath} />
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default SubpageLayout;
