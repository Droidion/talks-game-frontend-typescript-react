Example:

```jsx
import NumericInput from "./numeric-input.component";
import Decimal from "decimal.js";
<NumericInput
      handleChange={(input) => input}
      initialValue={new Decimal(1000)}
      isDisabled={false}
      isIncrementerActive={true}
      incrementalAmount={new Decimal(100)}
      isExtremeHelpersActive={true}
      maxPossibleValue={new Decimal(1000000)}
      minPossibleValue={new Decimal(0)}
    />;
```
