import Image from "next/image";
import { FiClock, FiTag } from "react-icons/fi";
import PropTypes from "prop-types";
import PagesMetaHead from "../../components/PagesMetaHead";
import { projectsData } from "../../data/projectsData";
import RelatedProjects from "../../components/projects/RelatedProjects";

function ProjectSingle(props) {
  return (
    <div className="container mx-auto">
      <PagesMetaHead title={props.project.title} />

      {/* Header */}
      <div>
        <p className="font-general-medium text-left text-3xl sm:text-4xl font-bold text-primary-dark dark:text-primary-light mt-14 sm:mt-20 mb-7">
          {props.project.ProjectHeader.title}
        </p>
        <div className="flex">
          <div className="flex items-center mr-10">
            <FiClock className="text-xl text-ternary-dark dark:text-ternary-light" />
            <span className="font-general-regular ml-2 leading-none text-primary-dark dark:text-primary-light">
              {props.project.ProjectHeader.publishDate}
            </span>
          </div>
          <div className="flex items-center">
            <FiTag className="w-4 h-4 text-ternary-dark dark:text-ternary-light" />
            <span className="font-general-regular ml-2 leading-none text-primary-dark dark:text-primary-light">
              {props.project.ProjectHeader.tags}
            </span>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-10 mt-12">
        {/* Info */}
        <div className="block sm:flex gap-0 sm:gap-10 mt-14">
          <div className="w-full text-left">
            {/* Single project client details */}
            <div className="mb-7">
              <p className="font-general-regular text-2xl font-semibold text-secondary-dark dark:text-secondary-light mb-2">
                {props.project.ProjectInfo.ClientHeading}
              </p>
              <ul className="leading-loose">
                {props.project.ProjectInfo.CompanyInfo.map((info) => {
                  return (
                    <li
                      className="font-general-regular text-ternary-dark dark:text-ternary-light"
                      key={info.id}
                    >
                      <span>{info.title}: </span>
                      <a
                        href="https://github.com/ervkgithub"
                        className={
                          info.title === "Website" || info.title === "Phone"
                            ? "hover:underline hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer duration-300"
                            : ""
                        }
                        aria-label="Project Website and Phone"
                      >
                        {info.details}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Single project technologies */}
            <div className="mb-7">
              <p className="font-general-regular text-2xl font-semibold text-ternary-dark dark:text-ternary-light mb-2">
                {props.project.ProjectInfo.Technologies[0].title}
              </p>
              <p className="font-general-regular text-primary-dark dark:text-ternary-light">
                {props.project.ProjectInfo.Technologies[0].techs.join(", ")}
              </p>
            </div>
          </div>
        </div>
        {props.project.ProjectImages.map((project) => {
          return (
            <div className="mb-10 sm:mb-0" key={project.id}>
              <Image
                src={project.img}
                className="rounded-xl cursor-pointer shadow-lg sm:shadow-none"
                alt={project.title}
                key={project.id}
                layout="responsive"
                width={100}
                height={90}
              />
            </div>
          );
        })}
      </div>

      <RelatedProjects />
    </div>
  );
}

ProjectSingle.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
    category: PropTypes.string,
    img: PropTypes.string,
    ProjectHeader: PropTypes.shape({
      title: PropTypes.string.isRequired,
      publishDate: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired,
    ProjectImages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
      })
    ).isRequired,
    ProjectInfo: PropTypes.shape({
      ClientHeading: PropTypes.string.isRequired,
      CompanyInfo: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          details: PropTypes.string.isRequired,
        })
      ).isRequired,
      ObjectivesHeading: PropTypes.string.isRequired,
      ObjectivesDetails: PropTypes.string.isRequired,
      Technologies: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          techs: PropTypes.arrayOf(PropTypes.string).isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: {
      project: projectsData.find(
        (project) => project.id === Number.parseInt(id, 10)
      ),
    },
  };
}

export default ProjectSingle;
