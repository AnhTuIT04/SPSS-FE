const HomeIcon = (props: any) => {
  const { stroke = '#141522', ...rest } = props;
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g transform="translate(-26.000000, -15.000000)">
          <g transform="translate(26.000000, 15.000000)">
            <rect
              fill="#FFFFFF"
              fillOpacity="0.01"
              fillRule="nonzero"
              height="24"
              width="24"
              x="0"
              y="0"
            />
            <polygon points="4.5 9 4.5 21 19.5 21 19.5 9 12 3" />
            <polygon
              points="4.5 21 4.5 9 2 11 12 3 22 11 19.5 9 19.5 21"
              stroke={stroke}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <polygon
              points="9.5 14.5 9.5 21 14.5 21 14.5 14.5"
              stroke={stroke}
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <line
              stroke={stroke}
              strokeLinecap="round"
              strokeWidth="1.5"
              x1="4.5"
              x2="19.5"
              y1="21"
              y2="21"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

const DashboardIcon = (props: any) => {
  const { stroke = '#141522', ...rest } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...rest}
    >
      <path
        d="M2 22H22"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.75 4V22H14.25V4C14.25 2.9 13.8 2 12.45 2H11.55C10.2 2 9.75 2.9 9.75 4Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 10V22H7V10C7 8.9 6.6 8 5.4 8H4.6C3.4 8 3 8.9 3 10Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 15V22H21V15C21 13.9 20.6 13 19.4 13H18.6C17.4 13 17 13.9 17 15Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const PrinterIcon = (props: any) => {
  const { stroke = '#141522', ...rest } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...rest}
    >
      <path
        d="M7.25 7H16.75V5C16.75 3 16 2 13.75 2H10.25C8 2 7.25 3 7.25 5V7Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 15V19C16 21 15 22 13 22H11C9 22 8 21 8 19V15H16Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 10V15C21 17 20 18 18 18H16V15H8V18H6C4 18 3 17 3 15V10C3 8 4 7 6 7H18C20 7 21 8 21 10Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 15H15.79H7"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 11H10"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const StudentIcon = (props: any) => {
  const { stroke = '#141522', ...rest } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...rest}
    >
      <path
        d="M21.08 8.58003V15.42C21.08 16.54 20.48 17.58 19.51 18.15L13.57 21.58C12.6 22.14 11.4 22.14 10.42 21.58L4.48 18.15C3.51 17.59 2.91 16.55 2.91 15.42V8.58003C2.91 7.46003 3.51 6.41999 4.48 5.84999L10.42 2.42C11.39 1.86 12.59 1.86 13.57 2.42L19.51 5.84999C20.48 6.41999 21.08 7.45003 21.08 8.58003Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 11C13.2868 11 14.33 9.95681 14.33 8.66998C14.33 7.38316 13.2868 6.34003 12 6.34003C10.7132 6.34003 9.67 7.38316 9.67 8.66998C9.67 9.95681 10.7132 11 12 11Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 16.66C16 14.86 14.21 13.4 12 13.4C9.79 13.4 8 14.86 8 16.66"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ReportIcon = (props: any) => {
  const { stroke = '#141522', ...rest } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...rest}
    >
      <path
        d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 13H13"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 17H11"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const SettingIcon = (props: any) => {
  const { stroke = '#141522', ...rest } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...rest}
    >
      <path
        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12.88V11.12C2 10.08 2.85 9.22 3.9 9.22C5.71 9.22 6.45 7.94 5.54 6.37C5.02 5.47 5.33 4.3 6.24 3.78L7.97 2.79C8.76 2.32 9.78 2.6 10.25 3.39L10.36 3.58C11.26 5.15 12.74 5.15 13.65 3.58L13.76 3.39C14.23 2.6 15.25 2.32 16.04 2.79L17.77 3.78C18.68 4.3 18.99 5.47 18.47 6.37C17.56 7.94 18.3 9.22 20.11 9.22C21.15 9.22 22.01 10.07 22.01 11.12V12.88C22.01 13.92 21.16 14.78 20.11 14.78C18.3 14.78 17.56 16.06 18.47 17.63C18.99 18.54 18.68 19.7 17.77 20.22L16.04 21.21C15.25 21.68 14.23 21.4 13.76 20.61L13.65 20.42C12.75 18.85 11.27 18.85 10.36 20.42L10.25 20.61C9.78 21.4 8.76 21.68 7.97 21.21L6.24 20.22C5.33 19.7 5.02 18.53 5.54 17.63C6.45 16.06 5.71 14.78 3.9 14.78C2.85 14.78 2 13.92 2 12.88Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const BuyPagesIcon = (props: any) => {
  const { stroke = '#141522', ...rest } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...rest}
    >
      <path
        d="M21.5 9H14C12.3431 9 11 10.3431 11 12C11 13.6569 12.3431 15 14 15H21.5M14 12V12.01M4.61111 5H19.3889C20.5548 5 21.5 6.04467 21.5 7.33333V16.6667C21.5 17.9553 20.5548 19 19.3889 19H4.61111C3.44518 19 2.5 17.9553 2.5 16.6667V7.33333C2.5 6.04467 3.44518 5 4.61111 5Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const PrintingLogIcon = (props: any) => {
  const { stroke = '#141522', ...rest } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...rest}
    >
      <path
        d="M12 8V12L14 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const MoreIcon = (props: any) => {
  const { stroke = '#141522', ...rest } = props;
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M10 19.1C15.0258 19.1 19.1 15.0258 19.1 10C19.1 4.97421 15.0258 0.9 10 0.9C4.97421 0.9 0.9 4.97421 0.9 10C0.9 15.0258 4.97421 19.1 10 19.1Z"
        stroke={stroke}
        strokeWidth="0.2"
      />
      <path
        d="M10 10.7929L7.73162 8.14645C7.56425 7.95118 7.29289 7.95118 7.12553 8.14645C6.95816 8.34171 6.95816 8.65829 7.12553 8.85355L9.69695 11.8536C9.86432 12.0488 10.1357 12.0488 10.303 11.8536L12.8745 8.85355C13.0418 8.65829 13.0418 8.34171 12.8745 8.14645C12.7071 7.95118 12.4358 7.95118 12.2684 8.14645L10 10.7929Z"
        fill="#565656"
      />
      <mask
        id="mask0_159_752"
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="7"
        y="8"
        width="6"
        height="4"
      >
        <path
          d="M10 10.7929L7.73162 8.14645C7.56425 7.95118 7.29289 7.95118 7.12553 8.14645C6.95816 8.34171 6.95816 8.65829 7.12553 8.85355L9.69695 11.8536C9.86432 12.0488 10.1357 12.0488 10.303 11.8536L12.8745 8.85355C13.0418 8.65829 13.0418 8.34171 12.8745 8.14645C12.7071 7.95118 12.4358 7.95118 12.2684 8.14645L10 10.7929Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_159_752)" />
    </svg>
  );
};

const LogoutIcon = (props: any) => {
  const { stroke = '#141522', ...rest } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M8.00195 7C8.01406 4.82497 8.11051 3.64706 8.87889 2.87868C9.75757 2 11.1718 2 14.0002 2H15.0002C17.8286 2 19.2429 2 20.1215 2.87868C21.0002 3.75736 21.0002 5.17157 21.0002 8V16C21.0002 18.8284 21.0002 20.2426 20.1215 21.1213C19.2429 22 17.8286 22 15.0002 22H14.0002C11.1718 22 9.75757 22 8.87889 21.1213C8.11051 20.3529 8.01406 19.175 8.00195 17"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 19.5C5.64298 19.5 4.46447 19.5 3.73223 18.7678C3 18.0355 3 16.857 3 14.5V9.5C3 7.14298 3 5.96447 3.73223 5.23223C4.46447 4.5 5.64298 4.5 8 4.5"
        stroke={stroke}
        strokeWidth="1.5"
      />
      <path
        d="M15 12L6 12M6 12L8 14M6 12L8 10"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const LoginIcon = (props: any) => {
  const { stroke = '#141522', ...rest } = props;
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M15.5303 12.5303C15.8232 12.2374 15.8232 11.7626 15.5303 11.4697L13.0303 8.96967C12.7374 8.67678 12.2626 8.67678 11.9697 8.96967C11.6768 9.26256 11.6768 9.73744 11.9697 10.0303L13.1893 11.25H6C5.58579 11.25 5.25 11.5858 5.25 12C5.25 12.4142 5.58579 12.75 6 12.75H13.1893L11.9697 13.9697C11.6768 14.2626 11.6768 14.7374 11.9697 15.0303C12.2626 15.3232 12.7374 15.3232 13.0303 15.0303L15.5303 12.5303Z"
        fill={stroke}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.9451 1.25H15.0549C16.4225 1.24998 17.5248 1.24996 18.3918 1.36652C19.2919 1.48754 20.0497 1.74643 20.6517 2.34835C21.2536 2.95027 21.5125 3.70814 21.6335 4.60825C21.75 5.47522 21.75 6.57754 21.75 7.94513V16.0549C21.75 17.4225 21.75 18.5248 21.6335 19.3918C21.5125 20.2919 21.2536 21.0497 20.6517 21.6517C20.0497 22.2536 19.2919 22.5125 18.3918 22.6335C17.5248 22.75 16.4225 22.75 15.0549 22.75H13.9451C12.5775 22.75 11.4752 22.75 10.6083 22.6335C9.70814 22.5125 8.95027 22.2536 8.34835 21.6517C7.94855 21.2518 7.70008 20.7832 7.54283 20.2498C6.59156 20.2486 5.79901 20.2381 5.15689 20.1518C4.39294 20.0491 3.7306 19.8268 3.20191 19.2981C2.67321 18.7694 2.45093 18.1071 2.34822 17.3431C2.24996 16.6123 2.24998 15.6865 2.25 14.5537V9.44631C2.24998 8.31349 2.24996 7.38774 2.34822 6.65689C2.45093 5.89294 2.67321 5.2306 3.20191 4.7019C3.7306 4.17321 4.39294 3.95093 5.15689 3.84822C5.79901 3.76189 6.59156 3.75142 7.54283 3.75017C7.70008 3.21677 7.94855 2.74816 8.34835 2.34835C8.95027 1.74643 9.70814 1.48754 10.6083 1.36652C11.4752 1.24996 12.5775 1.24998 13.9451 1.25ZM7.25 16.0549C7.24999 17.1048 7.24997 17.9983 7.30271 18.7491C6.46829 18.7459 5.84797 18.7312 5.35676 18.6652C4.75914 18.5848 4.46611 18.441 4.26257 18.2374C4.05903 18.0339 3.91519 17.7409 3.83484 17.1432C3.7516 16.5241 3.75 15.6997 3.75 14.5V9.5C3.75 8.30029 3.7516 7.47595 3.83484 6.85676C3.91519 6.25914 4.05903 5.9661 4.26257 5.76256C4.46611 5.55902 4.75914 5.41519 5.35676 5.33484C5.84797 5.2688 6.46829 5.25415 7.30271 5.25091C7.24997 6.00167 7.24999 6.89522 7.25 7.94512L7.25 8C7.25 8.41422 7.58579 8.75 8 8.75C8.41422 8.75 8.75 8.41422 8.75 8C8.75 6.56459 8.7516 5.56347 8.85315 4.80812C8.9518 4.07435 9.13225 3.68577 9.40901 3.40901C9.68578 3.13225 10.0743 2.9518 10.8081 2.85315C11.5635 2.75159 12.5646 2.75 14 2.75H15C16.4354 2.75 17.4365 2.75159 18.1919 2.85315C18.9257 2.9518 19.3142 3.13225 19.591 3.40901C19.8678 3.68577 20.0482 4.07435 20.1469 4.80812C20.2484 5.56347 20.25 6.56459 20.25 8V16C20.25 17.4354 20.2484 18.4365 20.1469 19.1919C20.0482 19.9257 19.8678 20.3142 19.591 20.591C19.3142 20.8678 18.9257 21.0482 18.1919 21.1469C17.4365 21.2484 16.4354 21.25 15 21.25H14C12.5646 21.25 11.5635 21.2484 10.8081 21.1469C10.0743 21.0482 9.68578 20.8678 9.40901 20.591C9.13225 20.3142 8.9518 19.9257 8.85315 19.1919C8.7516 18.4365 8.75 17.4354 8.75 16C8.75 15.5858 8.41422 15.25 8 15.25C7.58579 15.25 7.25 15.5858 7.25 16L7.25 16.0549Z"
        fill={stroke}
      />
    </svg>
  );
};

const GoogleIcon = (props: any) => {
  return (
    <svg viewBox="0 0 533.5 544.3" {...props}>
      <path
        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
        fill="#4285f4"
      />
      <path
        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
        fill="#34a853"
      />
      <path
        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
        fill="#fbbc04"
      />
      <path
        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
        fill="#ea4335"
      />
    </svg>
  );
};

const GitHubIcon = (props: any) => {
  return (
    <svg viewBox="0 0 32 32" {...props}>
      <path
        fillRule="evenodd"
        d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z"
      />
    </svg>
  );
};

const WarnIcon = (props: any) => {
  const { stroke = '#292D32', ...rest } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M12 13.75C11.59 13.75 11.25 13.41 11.25 13V7.75C11.25 7.34 11.59 7 12 7C12.41 7 12.75 7.34 12.75 7.75V13C12.75 13.41 12.41 13.75 12 13.75Z"
        fill={stroke}
      />
      <path
        d="M12 17.25C11.73 17.25 11.48 17.15 11.29 16.96C11.2 16.86 11.13 16.75 11.07 16.63C11.02 16.51 11 16.38 11 16.25C11 15.99 11.11 15.73 11.29 15.54C11.66 15.17 12.34 15.17 12.71 15.54C12.89 15.73 13 15.99 13 16.25C13 16.38 12.97 16.51 12.92 16.63C12.87 16.75 12.8 16.86 12.71 16.96C12.52 17.15 12.27 17.25 12 17.25Z"
        fill={stroke}
      />
      <path
        d="M12.0002 22.75C11.3302 22.75 10.6502 22.58 10.0502 22.23L4.11017 18.8C2.91017 18.1 2.16016 16.81 2.16016 15.42V8.57999C2.16016 7.18999 2.91017 5.89999 4.11017 5.19999L10.0502 1.77C11.2502 1.07 12.7402 1.07 13.9502 1.77L19.8902 5.19999C21.0902 5.89999 21.8402 7.18999 21.8402 8.57999V15.42C21.8402 16.81 21.0902 18.1 19.8902 18.8L13.9502 22.23C13.3502 22.58 12.6702 22.75 12.0002 22.75ZM12.0002 2.74998C11.5902 2.74998 11.1702 2.85998 10.8002 3.06998L4.86017 6.49998C4.12017 6.92998 3.66016 7.71999 3.66016 8.57999V15.42C3.66016 16.27 4.12017 17.07 4.86017 17.5L10.8002 20.93C11.5402 21.36 12.4602 21.36 13.1902 20.93L19.1302 17.5C19.8702 17.07 20.3302 16.28 20.3302 15.42V8.57999C20.3302 7.72999 19.8702 6.92998 19.1302 6.49998L13.1902 3.06998C12.8302 2.85998 12.4102 2.74998 12.0002 2.74998Z"
        fill={stroke}
      />
    </svg>
  );
};

const SuccessIcon = (props: any) => {
  const { stroke = '#10B981', ...rest } = props;
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 21 21"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(2 2)"
      >
        <circle cx="8.5" cy="8.5" r="8" />
        <path d="m5.5 9.5 2 2 5-5" />
      </g>
    </svg>
  );
};

export {
  HomeIcon,
  DashboardIcon,
  PrinterIcon,
  StudentIcon,
  ReportIcon,
  SettingIcon,
  BuyPagesIcon,
  PrintingLogIcon,
  MoreIcon,
  LogoutIcon,
  LoginIcon,
  GoogleIcon,
  GitHubIcon,
  WarnIcon,
  SuccessIcon,
};
