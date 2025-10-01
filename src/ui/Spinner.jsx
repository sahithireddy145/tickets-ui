const Spinner = () => {
  return (
    <>
      <style>
        {`
          .spinner-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 20px 0;
          }

          .spinner {
            width: 48px;
            height: 48px;
            border: 5px solid #ddd;       /* light gray border */
            border-top-color: #3498db;    /* blue spinning color */
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    </>
  );
};

export default Spinner;
