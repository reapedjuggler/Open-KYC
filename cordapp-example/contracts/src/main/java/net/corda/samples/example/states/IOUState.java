package net.corda.samples.example.states;

import net.corda.samples.example.contracts.IOUContract;
import net.corda.samples.example.schema.IOUSchemaV1;
import net.corda.core.contracts.BelongsToContract;
import net.corda.core.contracts.LinearState;
import net.corda.core.contracts.UniqueIdentifier;
import net.corda.core.identity.AbstractParty;
import net.corda.core.identity.Party;
import net.corda.core.schemas.MappedSchema;
import net.corda.core.schemas.PersistentState;
import net.corda.core.schemas.QueryableState;

import java.util.Arrays;
import java.util.List;

/**
 * The states object recording IOU agreements between two parties.
 *
 * A states must implement [ContractState] or one of its descendants.
 */
@BelongsToContract(IOUContract.class)
public class IOUState implements LinearState, QueryableState {
    private final Integer value;
    private final Party lender;
    private final Party borrower;
    private final UniqueIdentifier linearId;
    private final String aadhar;
    private final String pan;
    private final String email;
    private final String approval;
    private final String timestamp;
    /**
     * @param value the value of the IOU.
     * @param lender the party issuing the IOU.
     * @param borrower the party receiving and approving the IOU.
     */
    public IOUState(Integer value,
                    Party lender,
                    Party borrower,
                    UniqueIdentifier linearId,
                    String aadhar,
                    String pan,
                    String email,
                    String approval,
                    String timestamp)
    {
        this.value = value;
        this.lender = lender;
        this.borrower = borrower;
        this.linearId = linearId;
        this.aadhar = aadhar;
        this.pan = pan;
        this.email = email;
        this.approval = approval;
        this.timestamp = timestamp;
    }

    public Integer getValue() { return value; }
    public Party getLender() { return lender; }
    public Party getBorrower() { return borrower; }
    @Override public UniqueIdentifier getLinearId() { return linearId; }
    public String getAadhar() { return aadhar; }
    @Override public List<AbstractParty> getParticipants() {
        return Arrays.asList(lender, borrower);
    }

    @Override public PersistentState generateMappedObject(MappedSchema schema) {
        if (schema instanceof IOUSchemaV1) {
            return new IOUSchemaV1.PersistentIOU(
                    this.lender.getName().toString(),
                    this.borrower.getName().toString(),
                    this.value,
                    this.linearId.getId(),
                    this.aadhar,
                    this.pan ,
                    this.email ,
                    this.approval,
                    this.timestamp
            );
        } else {
            throw new IllegalArgumentException("Unrecognised schema $schema");
        }
    }

    @Override public Iterable<MappedSchema> supportedSchemas() {
        return Arrays.asList(new IOUSchemaV1());
    }

    @Override
    public String toString() {
        return String.format("IOUState(value=%s, lender=%s, borrower=%s, linearId=%s, aadhar=%s)", value, lender, borrower, linearId,aadhar,pan,email,approval);
    }
}