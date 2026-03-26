# TDR Calculation Principles

### 1. Velocity of Propagation ($V_p$)
In a vacuum, electromagnetic waves travel at light speed ($c \approx 3 \times 10^8$ m/s). In a PCB dielectric, the speed is reduced:

$$V_p = \frac{c}{\sqrt{\epsilon_{eff}}}$$

- **Stripline**: Since the trace is surrounded by dielectric, $\epsilon_{eff} \approx \epsilon_r$.
- **Microstrip**: Part of the field is in the air ($\epsilon_r = 1$), so $\epsilon_{eff} < \epsilon_r$.

### 2. Length from Time (TDR)
TDR measures the time elapsed from the pulse injection to the reflection arrival. Because the pulse travels to the point of discontinuity and back:

$$L = \frac{V_p \cdot \Delta t}{2}$$

### 3. Time from Known Length
Useful for estimating where a reflection should appear on a TDR trace:

$$\Delta t = \frac{2 \cdot L}{V_p}$$

### 4. Constants Used
- **Metric**: $c = 299.79$ mm/ns
- **Imperial**: $c = 11.803$ inch/ns
