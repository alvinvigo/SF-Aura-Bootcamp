public class AccountTriggerHandler extends TriggerHandler {
    AccountManagerHandler mh = new AccountManagerHandler();

    public override void beforeInsert() {
        mh.beforeInsert((List<Account>) Trigger.New);
    }

    public override void beforeUpdate() {
        mh.beforeUpdate((List<Account>) Trigger.New);
    }

    public override void beforeDelete() {
        mh.beforeDelete((List<Account>) Trigger.Old);
    }

    public override void afterInsert() {
        mh.afterInsert((List<Account>) Trigger.New);
    }

    public override void afterUpdate() {
        mh.afterUpdate((List<Account>) Trigger.New);
    }

    public override void afterDelete() {
        mh.afterDelete((List<Account>) Trigger.Old);
    }
}