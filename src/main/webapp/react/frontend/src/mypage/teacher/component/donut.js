
const donut = () => (
    <div style={{ marginTop: '50px', marginLeft: '50px' }}>
      <div style={{ width: '200px', height: '200px' }}>
        <svg viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="beige" strokeWidth="20" />
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="green"
            strokeWidth="20"
            strokeDasharray={2 * Math.PI * 90 * 1}
          />
        </svg>
      </div>
    </div>
  );
  
  export default donut;