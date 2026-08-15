"""
Decision Support Engine.

Converts Track Health Index, defect severity, and inspection reliability
into explainable inspection recommendations.

IMPORTANT:
These recommendations are prototype decision-support outputs.
They are NOT official railway operating or safety instructions.
"""


class DecisionSupportSystem:
    """
    Produces risk-aware maintenance and inspection recommendations.
    """

    def __init__(self):
        pass

    def generate_recommendation(
        self,
        thi: float,
        condition: str,
        risk_level: str,
        reliability_score: float,
        defect_count: int,
        maximum_severity: float
    ) -> dict:
        """
        Generate an explainable recommendation.
        """

        # Reliability has priority over aggressive automated decisions.
        if reliability_score < 50:
            action = (
                "MANUAL VERIFICATION REQUIRED"
            )

            priority = "HIGH"

            reason = (
                "Inspection reliability is low. "
                "Acquire a better-quality inspection image "
                "and perform manual verification before "
                "making an operational decision."
            )

        elif risk_level == "CRITICAL" or thi < 30:
            action = (
                "URGENT ENGINEERING INSPECTION"
            )

            priority = "CRITICAL"

            reason = (
                "The estimated Track Health Index is critically low "
                "or the detected defect severity is very high."
            )

        elif risk_level == "HIGH" or thi < 50:
            action = (
                "PRIORITIZE DETAILED INSPECTION"
            )

            priority = "HIGH"

            reason = (
                "The estimated track condition indicates elevated "
                "risk and requires engineering assessment."
            )

        elif risk_level == "MEDIUM" or thi < 75:
            action = (
                "SCHEDULE DETAILED INSPECTION"
            )

            priority = "MEDIUM"

            reason = (
                "The system detected conditions that require "
                "closer inspection and monitoring."
            )

        else:
            action = (
                "CONTINUE ROUTINE MONITORING"
            )

            priority = "LOW"

            reason = (
                "The estimated track condition is currently "
                "within the acceptable prototype monitoring range."
            )

        # Additional warning for high defect severity.
        if maximum_severity >= 75:
            severity_note = (
                "High defect severity detected; prioritize "
                "engineering review."
            )
        elif maximum_severity >= 50:
            severity_note = (
                "Moderate defect severity detected; "
                "include the location in scheduled inspection."
            )
        else:
            severity_note = (
                "No high-severity defect was identified "
                "by the prototype assessment."
            )

        return {
            "recommendation": action,
            "priority": priority,
            "reason": reason,
            "severity_note": severity_note,
            "thi": round(float(thi), 2),
            "condition": condition,
            "risk_level": risk_level,
            "reliability_score": round(
                float(reliability_score), 2
            ),
            "defect_count": int(defect_count),
            "maximum_severity": round(
                float(maximum_severity), 2
            )
        }